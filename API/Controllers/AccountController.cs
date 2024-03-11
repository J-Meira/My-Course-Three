using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class AccountController(
    UserManager<User> userManager,
    TokenService tokenService,
    BasketService basketService
  ) : BaseApiController
  {
    private readonly UserManager<User> _userManager = userManager;
    private readonly TokenService _tokenService = tokenService;
    private readonly BasketService _basketService = basketService;

    [HttpPost("sign-in")]
    public async Task<ActionResult<SignInRdto>> SignIn(SignInDto signInDto)
    {
      var user = await _userManager.FindByNameAsync(signInDto.UserName);
      if (user is null || !await _userManager.CheckPasswordAsync(user, signInDto.Password))
      {
        return Unauthorized();
      }

      var userBasket = await _basketService.RetrieveBasket(signInDto.UserName);
      var anonBasket = await _basketService.RetrieveBasket(Request.Cookies["buyerId"]);

      if (anonBasket != null)
      {
        await _basketService.TransferBasket(
          anonBasket,
          user.UserName,
          userBasket
        );
        Response.Cookies.Delete("buyerId");
      }

      return new SignInRdto
      {
        Email = user.Email,
        Token = await _tokenService.GenerateToken(user),
        Basket = anonBasket != null ?
          anonBasket.MapBasketToDto() :
          userBasket?.MapBasketToDto()
      };
    }

    [HttpPost("sign-up")]
    public async Task<ActionResult<User>> SignUp(SignUpDto signUpDto)
    {
      var user = new User
      {
        UserName = signUpDto.UserName,
        Email = signUpDto.Email
      };

      var result = await _userManager.CreateAsync(user, signUpDto.Password);

      if (!result.Succeeded)
      {
        foreach (var error in result.Errors)
        {
          ModelState.AddModelError(error.Code, error.Description);
        }
        return ValidationProblem();
      }

      await _userManager.AddToRoleAsync(user, "Member");

      return Created();
    }

    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<SignInRdto>> GetCurrentUser()
    {
      var user = await _userManager.FindByNameAsync(User.Identity.Name);

      var userBasket = await _basketService.RetrieveBasket(User.Identity.Name);

      return new SignInRdto
      {
        Email = user.Email,
        Token = await _tokenService.GenerateToken(user),
        Basket = userBasket?.MapBasketToDto()
      };
    }

    [Authorize]
    [HttpGet("savedAddress")]
    public async Task<ActionResult<UserAddress>> GetSavedAddress()
    {
      return await _userManager.Users
      .Where(u => u.UserName == User.Identity.Name)
      .Select(u => u.Address)
      .FirstOrDefaultAsync();
    }
  }


}
