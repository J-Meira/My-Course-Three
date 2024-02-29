namespace API.DTOs
{
  public record BasketItemDto(
    int productId,
    string name,
    decimal price,
    string pictureUrl,
    string brand,
    string type,
    int quantity
  );
}
