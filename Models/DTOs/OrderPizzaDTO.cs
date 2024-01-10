public class OrderPizzaDTO 
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int PizzaId { get; set; }
    public PizzaDTO Pizza { get; set; }
}