
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  public static class BasketExtensions
  {
    public static BasketRdto MapBasketToDto(this Basket basket)
    {
      return new BasketRdto(
        basket.Id,
        basket.BuyerId,
        basket.PaymentIntentId,
        basket.ClientSecret,
        basket.Items.Select(item =>
          new BasketItemRdto(
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

    public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
    {
      return query
          .Include(i => i.Items)
          .ThenInclude(p => p.Product)
          .Where(b => b.BuyerId == buyerId);
    }
  }

}
