using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.Order;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Authorize]
  public class OrderController(
    StoreContext context,
    IConfiguration config
  ) : BaseApiController
  {
    private readonly StoreContext _context = context;
    private readonly IConfiguration _config = config;

    [HttpGet]
    public async Task<ActionResult<List<OrderRdto>>> GetAll()
    {
      return await _context.Orders
        .ProjectOrderToOrderDto()
        .Where(x => x.BuyerId == User.Identity.Name)
        .ToListAsync();
    }

    [HttpGet("{id}", Name = "GetOrder")]
    public async Task<ActionResult<OrderRdto>> GetById(int id)
    {
      return await _context.Orders
        .ProjectOrderToOrderDto()
        .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
        .FirstOrDefaultAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
    {
      var basket = await _context.Baskets
      .RetrieveBasketWithItems(User.Identity.Name)
      .FirstOrDefaultAsync();

      if (basket is null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });

      var items = new List<OrderItem>();

      foreach (var item in basket.Items)
      {
        var productItem = await _context.Products.FindAsync(item.ProductId);
        var itemOrdered = new ProductItemOrdered
        {
          ProductId = productItem.Id,
          Name = productItem.Name,
          PictureUrl = productItem.PictureUrl
        };
        var orderItem = new OrderItem
        {
          ItemOrdered = itemOrdered,
          Price = productItem.Price,
          Quantity = item.Quantity
        };
        items.Add(orderItem);
        productItem.QuantityInStock -= item.Quantity;
      }

      var defaultDeliveryFee = int
        .Parse(_config
          .GetSection("OrderSettings:DefaultDeliveryFee")
            .Value ?? "100");
      var MinimumAmount = int
        .Parse(_config
          .GetSection("OrderSettings:MinimumAmount")
            .Value ?? "500");

      var subTotal = items.Sum(item => item.Price * item.Quantity);
      var deliveryFee = subTotal > MinimumAmount ? 0 : defaultDeliveryFee;

      var order = new Order
      {
        OrderItems = items,
        BuyerId = User.Identity.Name,
        ShippingAddress = orderDto.ShippingAddress,
        SubTotal = subTotal,
        DeliveryFee = deliveryFee,
      };

      _context.Orders.Add(order);
      _context.Baskets.Remove(basket);

      if (orderDto.SaveAddress)
      {
        var user = await _context.Users.
            Include(a => a.Address)
            .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

        var address = new UserAddress
        {
          FullName = orderDto.ShippingAddress.FullName,
          Address1 = orderDto.ShippingAddress.Address1,
          Address2 = orderDto.ShippingAddress.Address2,
          City = orderDto.ShippingAddress.City,
          State = orderDto.ShippingAddress.State,
          Zip = orderDto.ShippingAddress.Zip,
          Country = orderDto.ShippingAddress.Country
        };
        user.Address = address;
      }

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

      return BadRequest("Problem creating order");
    }
  }
}
