public class PizzaDTO
{
    public int Id { get; set; }
    public string Size { get; set; }
    public decimal Price { get; set; }
    public int CheeseId { get; set; }
    public CheeseDTO Cheese { get; set; }
    public int SauceId { get; set; }
    public SauceDTO Sauce { get; set; }
    public List<PizzaToppingDTO> PizzaToppings { get; set; }
    public decimal TotalCost {
        get
        {
            decimal total = Price;
            foreach(PizzaToppingDTO pt in PizzaToppings) { total += .50M; }
            return total;
        }
    }
}