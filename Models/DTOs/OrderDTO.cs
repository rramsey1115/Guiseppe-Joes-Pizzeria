using System.ComponentModel.DataAnnotations.Schema;
using GuiseppeJoes.Models;

public class OrderDTO
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    [ForeignKey("EmployeeId")]
    public UserProfileDTO? Employee { get; set; }
    public DateTime PlacedOnDate { get; set; }
     public DateTime? CompletedOnDate { get; set; }
    public bool Delivery { get; set; }
    public decimal Tip { get; set; }
    public int TableNumber { get; set; }
    public string? Address { get; set; }
    public int? DriverId { get; set; }
    [ForeignKey("DriverId")]
    public UserProfileDTO? Driver { get; set; }
    public List<PizzaDTO> OrderPizzas { get; set; }
    public decimal TotalCost { 
        get
        {
            decimal total = 0;
            
            foreach(PizzaDTO pizza in OrderPizzas)
            {
                total += pizza.TotalCost;
            }

            if (Delivery==true) 
            {
                total += 5;
            }

            total += Tip;

            return total;
        }
    }
}