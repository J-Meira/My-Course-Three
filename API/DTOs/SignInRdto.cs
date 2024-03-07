namespace API.DTOs
{
  public class SignInRdto
  {
    public string Email { get; set; }
    public string Token { get; set; }
    public BasketRdto Basket { get; set; }
  }
}
