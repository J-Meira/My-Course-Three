namespace API.DTOs
{
  public record BasketItemDto(
    int productId,
    string name,
    long price,
    string pictureUrl,
    string brand,
    string type,
    int quantity
  );
}
