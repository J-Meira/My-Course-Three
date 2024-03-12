using API.Entities;
using Stripe;

namespace API.Services
{
  public class PaymentService(
    IConfiguration config,
    BasketService basketService
  )
  {
    private readonly IConfiguration _config = config;
    private readonly BasketService _basketService = basketService;

    public async Task<PaymentIntent> UpSertPaymentIntent(Basket basket)
    {
      StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

      var service = new PaymentIntentService();
      var intent = new PaymentIntent();

      var subTotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
      var deliveryFee = _basketService.GetDeliveryFee(subTotal, _config);
      var amount = Convert.ToInt64((subTotal + deliveryFee) * 100);

      if (string.IsNullOrEmpty(basket.PaymentIntentId))
      {
        var options = new PaymentIntentCreateOptions
        {
          Amount = amount,
          Currency = "usd",
          PaymentMethodTypes = new List<string> { "card" }
        };
        intent = await service.CreateAsync(options);
        basket.PaymentIntentId = intent.Id;
        basket.ClientSecret = intent.ClientSecret;
      }
      else
      {
        var options = new PaymentIntentUpdateOptions
        {
          Amount = amount
        };
        await service.UpdateAsync(basket.PaymentIntentId, options);
      }

      return intent;
    }
  }
}
