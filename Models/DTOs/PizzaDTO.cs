public class PizzaDTO
{
    public int Id { get; set; }
    public int SizeId { get; set; }
    public SizeDTO Size { get; set; }
    public int CheeseId { get; set; }
    public CheeseDTO Cheese { get; set; }
    public int SauceId { get; set; }
    public SauceDTO Sauce { get; set; }
    public int OrderId { get; set; }
    public OrderDTO Order { get; set; }
    public List<PizzaToppingDTO> PizzaToppings { get; set; }
    public decimal TotalCost {
        get
        {
            decimal total = Size.Price;
            foreach(PizzaToppingDTO pt in PizzaToppings) { total += .50M; }
            return total;
        }
    }
}