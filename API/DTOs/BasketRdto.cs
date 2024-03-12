namespace API.DTOs
{
  public record BasketRdto(
    int Id,
    string BuyerId,
    string PaymentIntentId,
    string ClientSecret,
    List<BasketItemRdto> Items
  );
}
