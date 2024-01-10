using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models.DTOs;

public class RegistrationDTO
{
    [EmailAddress]
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    [MaxLength(50, ErrorMessage = "Username may only be 50 or less characters")]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }
}