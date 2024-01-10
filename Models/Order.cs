using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using GuiseppeJoes.Models;

public class Order 
{
    public int Id { get; set; }

    [Required] 
    public int EmployeeId { get; set; }

    [ForeignKey("EmployeeId")]
    public UserProfile Employee { get; set; }

    [Required]
    public DateTime PlacedOnDate { get; set; }

    public DateTime? CompletedOnDate { get; set; }

    [Required]
    public bool Delivery { get; set; }

    [Required]
    public decimal Tip { get; set; }

    [Required]
    [Range(0, 10)]
    public int TableNumber { get; set; }

    public string? Address { get; set; }

    [AllowNull]
    public int? DriverId { get; set; }

    [ForeignKey("DriverId")]
    public UserProfile? Driver { get; set; }

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