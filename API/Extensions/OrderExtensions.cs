
using API.DTOs;
using API.Entities.Order;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class OrderExtensions
{
  public static IQueryable<OrderRdto> ProjectOrderToOrderDto(this IQueryable<Order> query)
  {
    return query
      .Select(order => new OrderRdto
      {
        Id = order.Id,
        BuyerId = order.BuyerId,
        OrderDate = order.OrderDate,
        ShippingAddress = order.ShippingAddress,
        DeliveryFee = order.DeliveryFee,
        Subtotal = order.SubTotal,
        OrderStatus = order.OrderStatus,
        Total = order.GetTotal(),
        OrderItems = order.OrderItems.Select(item => new OrderItemRdto
        {
          ProductId = item.ItemOrdered.ProductId,
          Name = item.ItemOrdered.Name,
          PictureUrl = item.ItemOrdered.PictureUrl,
          Price = item.Price,
          Quantity = item.Quantity
        }).ToList()
      }).AsNoTracking();
  }
}
