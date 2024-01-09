using GuiseppeJoes.Models;

public class Employee
{
   public int Id { get; set; }
   public int UserProfileId { get; set; }
   public UserProfile userProfile { get; set; }
   public string Name { get; set; } 
}