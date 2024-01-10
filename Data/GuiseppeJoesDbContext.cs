using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using GuiseppeJoes.Models;

namespace GuiseppeJoes.Data;
public class GuiseppeJoesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Cheese> Cheeses { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<PizzaTopping> PizzaToppings { get; set; }
    public DbSet<Sauce> Sauces { get; set; }
    public DbSet<Size> Sizes { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    
    public GuiseppeJoesDbContext(DbContextOptions<GuiseppeJoesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street"
        });

        modelBuilder.Entity<Topping>().HasData(
            new { Id = 1, Name  = "Sausage" },
            new { Id = 2, Name = "Pepperoni" },
            new { Id = 3, Name = "Meatball" },
            new { Id = 4, Name = "Bacon" },
            new { Id = 5, Name = "Mushroom" },
            new { Id = 6, Name = "Onion" },
            new { Id = 7, Name = "Green Pepper" },
            new { Id = 8, Name = "Black Olive" },
            new { Id = 9, Name = "Basil" },
            new { Id = 10, Name = "Pineapple"},
            new { Id = 11, Name = "Extra Cheese" }
        );

        modelBuilder.Entity<PizzaTopping>().HasData(
            new { Id = 1, PizzaId = 1, ToppingId = 1 },
            new { Id = 2, PizzaId = 1, ToppingId = 2 },
            new { Id = 3, PizzaId = 1, ToppingId = 3 },
            new { Id = 4, PizzaId = 2, ToppingId = 5 },
            new { Id = 5, PizzaId = 2, ToppingId = 6 },
            new { Id = 6, PizzaId = 3, ToppingId = 7 },
            new { Id = 7, PizzaId = 3, ToppingId = 6 },
            new { Id = 8, PizzaId = 3, ToppingId = 7 },
            new { Id = 9, PizzaId = 3, ToppingId = 9 },
            new { Id = 10, PizzaId = 3, ToppingId = 11 },
            new { Id = 11, PizzaId = 4, ToppingId = 2 },
            new { Id = 12, PizzaId = 4, ToppingId = 4 },
            new { Id = 13, PizzaId = 4, ToppingId = 11 },
            new { Id = 14, PizzaId = 6, ToppingId = 2 },
            new { Id = 15, PizzaId = 6, ToppingId = 11 },
            new { Id = 16, PizzaId = 7, ToppingId = 4 },
            new { Id = 17, PizzaId = 7, ToppingId = 8 },
            new { Id = 18, PizzaId = 7, ToppingId = 7 },
            new { Id = 19, PizzaId = 7, ToppingId = 6 },
            new { Id = 20, PizzaId = 8, ToppingId = 1 },
            new { Id = 21, PizzaId = 8, ToppingId = 2 },
            new { Id = 22, PizzaId = 9, ToppingId = 3 },
            new { Id = 23, PizzaId = 9, ToppingId = 4 },
            new { Id = 24, PizzaId = 9, ToppingId = 11 },
            new { Id = 25, PizzaId = 11, ToppingId = 2 },
            new { Id = 26, PizzaId = 11, ToppingId = 11 },
            new { Id = 27, PizzaId = 11, ToppingId = 3 },
            new { Id = 28, PizzaId = 11, ToppingId = 7 },
            new { Id = 29, PizzaId = 13, ToppingId = 8 },
            new { Id = 30, PizzaId = 13, ToppingId = 10 }
        );

        modelBuilder.Entity<Sauce>().HasData(
            new { Id = 1, Name = "Marinara" },
            new { Id = 2, Name = "Arrabbiata" },
            new { Id = 3, Name = "Garlic White" },
            new { Id = 4, Name = "Pesto" },
            new { Id = 5, Name = "None" }
        );

        modelBuilder.Entity<Cheese>().HasData( 
            new { Id = 1, Name = "Four Cheese" },
            new { Id = 2, Name = "Buffalo Mozzarella" },
            new { Id = 3, Name = "Vegan" },
            new { Id = 4, Name = "Mozzarella" },
            new { Id = 5, Name = "None" }
        );

        modelBuilder.Entity<Size>().HasData( 
            new { Id = 1, Name = "Small (10\")", Price = 10.00M },
            new { Id = 2, Name = "Medium (14\")", Price = 12.00M },
            new { Id = 3, Name = "Large (18\")", Price = 15.00M }
        );

        modelBuilder.Entity<Pizza>().HasData(
            new {Id = 1, SizeId = 3, CheeseId = 1, SauceId = 1 },
            new {Id = 2, SizeId = 3, CheeseId = 1, SauceId = 1 },
            new {Id = 3, SizeId = 1, CheeseId = 3, SauceId = 1 },
            new {Id = 4, SizeId = 3, CheeseId = 1, SauceId = 1 },
            new {Id = 5, SizeId = 2, CheeseId = 4, SauceId = 1 },
            new {Id = 6, SizeId = 1, CheeseId = 2, SauceId = 1 },
            new {Id = 7, SizeId = 3, CheeseId = 4, SauceId = 1 },
            new {Id = 8, SizeId = 3, CheeseId = 1, SauceId = 1 },
            new {Id = 9, SizeId = 1, CheeseId = 4, SauceId = 1 },
            new {Id = 10, SizeId = 1, CheeseId = 2, SauceId = 1 },
            new {Id = 11, SizeId = 3, CheeseId = 1, SauceId = 1 },
            new {Id = 12, SizeId = 1, CheeseId = 3, SauceId = 1 },
            new {Id = 13, SizeId = 2, CheeseId = 1, SauceId = 1 },
            new {Id = 14, SizeId = 2, CheeseId = 2, SauceId = 1 },
            new {Id = 15, SizeId = 3, CheeseId = 3, SauceId = 1 }
        );

        modelBuilder.Entity<Order>().HasData( 
            new 
            { 
                Id = 1, 
                EmployeeId = 1, 
                PlacedOnDate = new DateTime(2024, 01, 09, 12, 30, 00),
                CompletedOnDate = new DateTime(2024, 01, 09, 12, 42, 00),
                Delivery = true,
                Tip = 6.00M,
                TableNumber = 0,
                DeliveryAddress = "1255 Main St.",
                DriverId = 1
            }
        );
    }
}