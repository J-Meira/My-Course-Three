namespace API.DTOs
{
  public record BasketRdto(
    int Id,
    string BuyerId,
    List<BasketItemRdto> Items
  );
}
