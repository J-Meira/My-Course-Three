using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController(StoreContext context) : BaseApiController
  {
    private readonly StoreContext _context = context;

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
      var basket = await RetrieveBasket();
      if (basket is null) return NotFound();
      return base.Ok(BasketMapper(basket));
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
      var basket = await RetrieveBasket();
      if (basket is null) basket = CreateBasket();

      var product = await _context.Products.FindAsync(productId);
      if (product is null) return NotFound();

      basket.AddItem(product, quantity);
      var result = await _context.SaveChangesAsync() > 0;

      return result ? CreatedAtRoute("GetBasket", BasketMapper(basket)) : BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemToBasket(int productId, int quantity)
    {
      var basket = await RetrieveBasket();
      if (basket is null) return NotFound();

      basket.RemoveItem(productId, quantity);
      var result = await _context.SaveChangesAsync() > 0;

      return result ? Ok() : BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
    }

    private static BasketDto BasketMapper(Basket basket)
    {
      return new BasketDto(
              basket.Id,
              basket.BuyerId,
              basket.Items.Select(item =>
                new BasketItemDto(
                  item.ProductId,
                  item.Product.Name,
                  item.Product.Price,
                  item.Product.PictureUrl,
                  item.Product.Type,
                  item.Product.Brand,
                  item.Quantity
                )
              ).ToList()
            );
    }

    private Basket CreateBasket()
    {
      var buyerId = Guid.NewGuid().ToString();

      var cookiesOptions = new CookieOptions
      {
        IsEssential = true,
        Expires = DateTime.Now.AddDays(30)
      };
      Response.Cookies.Append("buyerId", buyerId, cookiesOptions);

      var basket = new Basket
      {
        BuyerId = buyerId,
      };

      _context.Baskets.Add(basket);

      return basket;
    }

    private async Task<Basket> RetrieveBasket()
    {
      return await _context.Baskets
            .Include(b => b.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
    }

  }
}
