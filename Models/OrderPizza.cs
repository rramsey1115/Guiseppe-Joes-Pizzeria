using System.ComponentModel.DataAnnotations;

public class OrderPizza 
{
    public int Id { get; set; }
    [Required]
    public int OrderId { get; set; }
    [Required]
    public int PizzaId { get; set; }
    public Pizza Pizza { get; set; }
}