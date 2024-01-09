using System.ComponentModel.DataAnnotations.Schema;

public class OrderDTO
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    [ForeignKey("EmployeeId")]
    public Employee Employee { get; set; }
    public DateTime PlacedOnDate { get; set; }
    public bool Delivery { get; set; }
    public decimal Tip { get; set; }
    public int TableNumber { get; set; }
    public string? DeliveryAddress { get; set; }
    public int DriverId { get; set; }
    [ForeignKey("DriverId")]
    public Employee? Driver { get; set; }
    public List<Pizza> OrderPizzas { get; set; }
    public decimal TotalCost { 
        get
        {
            decimal total = 0;
            OrderPizzas.Select(op => total += op.TotalCost);
            total += Tip;
            if (Delivery==true) {total += 5;}
            return total;
        }
    }
}