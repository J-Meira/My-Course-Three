namespace API.DTOs
{
  public record BasketItemRdto(
    int ProductId,
    string Name,
    decimal Price,
    string PictureUrl,
    string Brand,
    string Type,
    int Quantity
  );
}
