using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext(DbContextOptions options) : DbContext(options)
  {
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
      configurationBuilder
        .Properties<decimal>()
        .HaveColumnType("decimal(10,2)");
    }
  }
}
