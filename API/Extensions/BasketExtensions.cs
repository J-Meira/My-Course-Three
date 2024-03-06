
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
  public static class BasketExtensions
  {
    public static BasketDto MapBasketToDto(this Basket basket)
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
  }

}
