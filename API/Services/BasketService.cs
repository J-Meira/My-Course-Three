using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
  public class BasketService(StoreContext context)
  {
    private readonly StoreContext _context = context;

    public async Task<Basket> RetrieveBasket(string buyerId)
    {
      if (string.IsNullOrEmpty(buyerId))
      {
        return null;
      }
      return await _context.Baskets
        .Include(b => b.Items)
        .ThenInclude(i => i.Product)
        .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }
    public async Task<bool> TransferBasket(
      Basket anonBasket,
      string userName,
      Basket userBasket
    )
    {
      if (userBasket != null) _context.Baskets.Remove(userBasket);
      anonBasket.BuyerId = userName;
      return await _context.SaveChangesAsync() > 0;
    }

  }
}
