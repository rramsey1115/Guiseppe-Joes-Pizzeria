using GuiseppeJoes.Models;

public class EmployeeDTO
{
   public int Id { get; set; }
   public int UserProfileId { get; set; }
   public UserProfileDTO userProfile { get; set; }
   public string Name { get; set; } 
}