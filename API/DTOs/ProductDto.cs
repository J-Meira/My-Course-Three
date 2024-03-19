using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
  public class ProductDto
  {
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    [Range(1, Double.PositiveInfinity)]
    public decimal Price { get; set; }
    public IFormFile File { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    [Range(0, 100)]
    public int QuantityInStock { get; set; }
  }
}
