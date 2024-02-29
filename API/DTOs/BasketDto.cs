namespace API.DTOs
{
  public record BasketDto(
    int id,
    string buyerId,
    List<BasketItemDto> items
  );
}
