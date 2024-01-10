using System.ComponentModel.DataAnnotations;

public class PizzaTopping 
{
    public int Id { get; set; }
    [Required]
    public int PizzaId { get; set; }
    [Required]
    public int ToppingId { get; set; }
    public Topping Topping { get; set; }
} 