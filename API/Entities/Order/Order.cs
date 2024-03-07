using System.ComponentModel.DataAnnotations;

namespace API.Entities.Order
{
  public class Order
  {
    public int Id { get; set; }
    public string BuyerId { get; set; }
    [Required]
    public ShippingAddress ShippingAddress { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.Now;
    public List<OrderItem> OrderItems { get; set; }
    public decimal SubTotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

    public decimal GetTotal()
    {
      return SubTotal + DeliveryFee;
    }
  }
}
