
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductController(StoreContext context, IMapper mapper, ImageService imageService) : BaseApiController
  {
    private readonly StoreContext _context = context;
    private readonly IMapper _mapper = mapper;
    private readonly ImageService _imageService = imageService;

    [HttpGet]
    public async Task<ActionResult<PageList<Product>>> GetAll([FromQuery] ProductParams productParams)
    {
      var query = _context.Products
      .Sort(productParams.OrderBy)
      .Search(productParams.SearchTerm)
      .Filter(productParams.Brands, productParams.Types)
      .AsQueryable();

      var products = await PageList<Product>
        .ToPageList(query, productParams.PageNumber, productParams.PageSize);

      Response.AddPaginationHeader(products.MetaData);
      return Ok(products);
    }

    [HttpGet("{id}", Name = "GetProduct")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
      var product = await _context.Products.FindAsync(id);

      return product is null ? NotFound() : Ok(product);
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
      var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
      var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();

      return Ok(new
      {
        brands,
        types
      });
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromForm] ProductDto productDto)
    {
      var product = _mapper.Map<Product>(productDto);

      if (productDto.File is null)
      {
        ModelState.AddModelError("File", "File is Required");
        return ValidationProblem();
      }

      var imageResult = await _imageService.AddImageAsync(productDto.File);

      if (imageResult.Error is not null)
        return BadRequest(new ProblemDetails
        {
          Title = imageResult.Error.Message
        });

      product.PictureUrl = imageResult.SecureUrl.ToString();
      product.PicturePublicId = imageResult.PublicId;

      _context.Products.Add(product);

      var result = await _context.SaveChangesAsync() > 0;

      return result ?
       CreatedAtRoute("GetProduct", new { id = product.Id }, product) :
       BadRequest(new ProblemDetails { Title = "Problem creating new product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateById([FromForm] ProductDto productDto, int id)
    {
      var product = await _context.Products.FindAsync(id);

      if (product is null) return NotFound();

      _mapper.Map(productDto, product);

      if (productDto.File is not null)
      {
        var imageUploadResult = await _imageService.AddImageAsync(productDto.File);

        if (imageUploadResult.Error is not null)
          return BadRequest(new ProblemDetails { Title = imageUploadResult.Error.Message });

        if (!string.IsNullOrEmpty(product.PicturePublicId))
          await _imageService.DeleteImageAsync(product.PicturePublicId);

        product.PictureUrl = imageUploadResult.SecureUrl.ToString();
        product.PicturePublicId = imageUploadResult.PublicId;
      }

      var result = await _context.SaveChangesAsync() > 0;

      return result ?
       Ok(product) :
       BadRequest(new ProblemDetails { Title = "Problem updating product" });
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> DeleteById(int id)
    {
      var product = await _context.Products.FindAsync(id);

      if (product is null) return NotFound();

      if (!string.IsNullOrEmpty(product.PicturePublicId))
        await _imageService.DeleteImageAsync(product.PicturePublicId);

      _context.Products.Remove(product);

      var result = await _context.SaveChangesAsync() > 0;

      return result ?
       Ok() :
       BadRequest(new ProblemDetails { Title = "Problem deleting product" });
    }

  }
}
