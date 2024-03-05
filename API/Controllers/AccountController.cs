using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class AccountController(UserManager<User> userManager, TokenService tokenService) : BaseApiController
  {
    private readonly UserManager<User> _userManager = userManager;
    private readonly TokenService _tokenService = tokenService;

    [HttpPost("sign-in")]
    public async Task<ActionResult<SignInRdto>> SignIn(SignInDto signInDto)
    {
      var user = await _userManager.FindByNameAsync(signInDto.UserName);
      if (user is null || !await _userManager.CheckPasswordAsync(user, signInDto.Password))
      {
        return Unauthorized();
      }
      return new SignInRdto
      {
        Email = user.Email,
        Token = await _tokenService.GenerateToken(user)
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

      return new SignInRdto
      {
        Email = user.Email,
        Token = await _tokenService.GenerateToken(user),
      };
    }
  }


}
