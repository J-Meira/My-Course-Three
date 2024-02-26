
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Route("[controller]")]
  public class ProductController(StoreContext context) : ControllerBase
  {
    private readonly StoreContext _context = context;

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
      return await _context.Products.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
      return await _context.Products.FindAsync(id);
    }

  }
}
