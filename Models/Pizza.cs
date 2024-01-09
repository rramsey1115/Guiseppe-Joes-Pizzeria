public class Pizza 
{
    public int Id { get; set; }
    public string Size { get; set; }
    public decimal Price { get; set; }
    public int CheeseId { get; set; }
    public Cheese Cheese { get; set; }
    public int SauceId { get; set; }
    public Sauce Sauce { get; set; }
    public List<PizzaTopping> PizzaToppings { get; set; }
    public decimal TotalCost {
        get
        {
            decimal total = Price;
            foreach(PizzaTopping pt in PizzaToppings) { total += .50M; }
            return total;
        }
    }
}