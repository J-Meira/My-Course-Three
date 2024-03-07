using API.Entities.Order;

namespace API.DTOs
{
  public class OrderRdto
  {
    public int Id { get; set; }
    public string BuyerId { get; set; }
    public ShippingAddress ShippingAddress { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal Subtotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public OrderStatus OrderStatus { get; set; }
    public decimal Total { get; set; }
    public List<OrderItemRdto> OrderItems { get; set; }
  }
}
