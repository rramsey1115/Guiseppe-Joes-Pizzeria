using System.ComponentModel.DataAnnotations;

public class Pizza 
{
    public int Id { get; set; }
    [Required]
    public int SizeId { get; set; }
    public Size? Size { get; set; }
    [Required]
    public int CheeseId { get; set; }
    public Cheese? Cheese { get; set; }
    [Required]
    public int SauceId { get; set; }
    public Sauce? Sauce { get; set; }
    [Required]
    public int OrderId { get; set; }
    public List<PizzaTopping>? PizzaToppings { get; set; }
    public decimal TotalCost {
        get
        {
            if(PizzaToppings != null && Size != null)
            {
                var total = Size.Price;
                foreach(PizzaTopping pt in PizzaToppings) { total += .50M; };
                return total;
            }
            return 0M;
        }
    }
} 