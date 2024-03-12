using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class PaymentController(
    PaymentService paymentService,
    StoreContext context,
    IConfiguration config
    ) : BaseApiController
  {
    private readonly PaymentService _paymentService = paymentService;
    private readonly StoreContext _context = context;
    private readonly IConfiguration _config = config;

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketRdto>> UpsertPaymentIntent()
    {
      var basket = await _context.Baskets
          .RetrieveBasketWithItems(User.Identity.Name)
          .FirstOrDefaultAsync();

      if (basket == null) return NotFound();

      var intent = await _paymentService.UpSertPaymentIntent(basket);

      if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

      basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
      basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

      _context.Update(basket);

      var result = await _context.SaveChangesAsync() > 0;

      if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket with intent" });

      return basket.MapBasketToDto();
    }

  }
}
