using System.ComponentModel.DataAnnotations;

public class Pizza 
{
    public int Id { get; set; }
    [Required]
    public string SizeId { get; set; }
    public Size Size { get; set; }
    [Required]
    public int CheeseId { get; set; }
    public Cheese Cheese { get; set; }
    [Required]
    public int SauceId { get; set; }
    public Sauce Sauce { get; set; }
    public List<PizzaTopping> PizzaToppings { get; set; }
    public decimal TotalCost {
        get
        {
            decimal total = Size.Price;
            foreach(PizzaTopping pt in PizzaToppings) { total += .50M; }
            return total;
        }
    }
} 