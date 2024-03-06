using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BasketController(
    StoreContext context,
    BasketService basketService
  ) : BaseApiController
  {
    private readonly StoreContext _context = context;
    private readonly BasketService _basketService = basketService;

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
      var basket = await _basketService.RetrieveBasket(GetBuyerId());
      if (basket is null) return NotFound();
      return base.Ok(basket.MapBasketToDto());
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
      var basket = await _basketService.RetrieveBasket(GetBuyerId());
      if (basket is null) basket = CreateBasket();

      var product = await _context.Products.FindAsync(productId);
      if (product is null) return NotFound();

      basket.AddItem(product, quantity);
      var result = await _context.SaveChangesAsync() > 0;

      return result ?
        CreatedAtRoute("GetBasket", basket.MapBasketToDto()) :
        BadRequest(new ProblemDetails
        {
          Title = "Problem saving item to basket"
        });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemToBasket(int productId, int quantity)
    {
      var basket = await _basketService.RetrieveBasket(GetBuyerId());
      if (basket is null) return NotFound();

      basket.RemoveItem(productId, quantity);
      var result = await _context.SaveChangesAsync() > 0;

      return result ? Ok() : BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
    }

    private Basket CreateBasket()
    {
      var buyerId = User.Identity?.Name;
      if (string.IsNullOrEmpty(buyerId))
      {
        buyerId = Guid.NewGuid().ToString();

        var cookiesOptions = new CookieOptions
        {
          IsEssential = true,
          Expires = DateTime.Now.AddDays(30)
        };
        Response.Cookies.Append("buyerId", buyerId, cookiesOptions);
      }

      var basket = new Basket
      {
        BuyerId = buyerId,
      };

      _context.Baskets.Add(basket);

      return basket;
    }

    private string GetBuyerId()
    {
      return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }

  }
}
