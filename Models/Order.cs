using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Order 
{
    public int Id { get; set; }
    [Required]
    public int EmployeeId { get; set; }
    [ForeignKey("EmployeeId")]
    public Employee Employee { get; set; }
    [Required]
    public DateTime PlacedOnDate { get; set; }
    [Required]
    public bool Delivery { get; set; }
    [Required]
    public decimal Tip { get; set; }
    [Required]
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