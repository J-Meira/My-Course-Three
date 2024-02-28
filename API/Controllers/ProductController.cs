
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductController(StoreContext context) : BaseApiController
  {
    private readonly StoreContext _context = context;

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
      var products = await _context.Products.ToListAsync();
      return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
      var product = await _context.Products.FindAsync(id);

      return product is null ? NotFound() : Ok(product);
    }

  }
}
