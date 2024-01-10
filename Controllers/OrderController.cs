using GuiseppeJoes.Data;
using GuiseppeJoes.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GuiseppeJoes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private GuiseppeJoesDbContext _dbContext;

    public OrderController(GuiseppeJoesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        try
        {
        return Ok(_dbContext.Orders
        .Include(o => o.OrderPizzas).ThenInclude(op => op.Size)
        .Include(o => o.OrderPizzas).ThenInclude(op => op.Sauce)
        .Include(o => o.OrderPizzas).ThenInclude(op => op.Cheese)
        .Include(o => o.OrderPizzas).ThenInclude(op => op.PizzaToppings).ThenInclude(pt => pt.Topping)
        .Include(o => o.Employee)
        .Include(o => o.Driver)
        .OrderByDescending(o => o.PlacedOnDate)
        .Select(o => new OrderDTO
            {
                Id = o.Id,
                EmployeeId = o.EmployeeId,
                Employee = new UserProfileDTO 
                {
                    Id = o.Employee.Id,
                    FirstName = o.Employee.FirstName,
                    LastName = o.Employee.LastName
                },
                PlacedOnDate = o.PlacedOnDate,
                CompletedOnDate = o.CompletedOnDate,
                Delivery = o.Delivery,
                Tip = o.Tip,
                TableNumber = o.TableNumber,
                Address = o.Address,
                DriverId = o.DriverId,
                Driver = o.Driver != null ? new UserProfileDTO
                {
                    Id = o.Driver.Id,
                    FirstName = o.Driver.FirstName,
                    LastName = o.Driver.LastName
                } : null,
                OrderPizzas = o.OrderPizzas.Select(op => new PizzaDTO
                {
                    Id = op.Id,
                    SizeId = op.SizeId,
                    Size = new SizeDTO
                    {
                        Id = op.Size.Id,
                        Name = op.Size.Name,
                        Price = op.Size.Price
                    },
                    CheeseId = op.CheeseId,
                    Cheese = new CheeseDTO 
                    {
                        Id = op.Cheese.Id,
                        Name = op.Cheese.Name
                    },
                    SauceId = op.SauceId,
                    Sauce = new SauceDTO
                    {
                        Id = op.Sauce.Id,
                        Name = op.Sauce.Name
                    },
                    OrderId = op.OrderId,
                    PizzaToppings = op.PizzaToppings.Select(pt => new PizzaToppingDTO
                    {
                        Id = pt.Id,
                        PizzaId = pt.PizzaId,
                        ToppingId = pt.ToppingId,
                        Topping = new ToppingDTO
                        {
                            Id = pt.Topping.Id,
                            Name = pt.Topping.Name
                        }
                    }).ToList()
                }).ToList()
            }
        ).ToList()
        );
        }
        catch (Exception ex)
        {
            return BadRequest($"Bad Request: {ex}");
        }
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        try
        {
            var found = _dbContext.Orders
            .Include(o => o.OrderPizzas).ThenInclude(op => op.Size)
            .Include(o => o.OrderPizzas).ThenInclude(op => op.Sauce)
            .Include(o => o.OrderPizzas).ThenInclude(op => op.Cheese)
            .Include(o => o.OrderPizzas).ThenInclude(op => op.PizzaToppings).ThenInclude(pt => pt.Topping)
            .Include(o => o.Employee)
            .Include(o => o.Driver)
            .SingleOrDefault(o => o.Id == id);

            if (found == null)
            {
                return BadRequest("Matching order.id not found");
            }

            return Ok(new OrderDTO
            {
                Id = found.Id,
                EmployeeId = found.EmployeeId,
                Employee = new UserProfileDTO 
                {
                    Id = found.Employee.Id,
                    FirstName = found.Employee.FirstName,
                    LastName = found.Employee.LastName
                },
                PlacedOnDate = found.PlacedOnDate,
                CompletedOnDate = found.CompletedOnDate,
                Delivery = found.Delivery,
                Tip = found.Tip,
                TableNumber = found.TableNumber,
                Address = found.Address,
                DriverId = found.DriverId,
                Driver = found.Driver != null ? new UserProfileDTO
                {
                    Id = found.Driver.Id,
                    FirstName = found.Driver.FirstName,
                    LastName = found.Driver.LastName
                } : null,
                OrderPizzas = found.OrderPizzas.Select(op => new PizzaDTO
                {
                    Id = op.Id,
                    SizeId = op.SizeId,
                    Size = new SizeDTO
                    {
                        Id = op.Size.Id,
                        Name = op.Size.Name,
                        Price = op.Size.Price
                    },
                    CheeseId = op.CheeseId,
                    Cheese = new CheeseDTO 
                    {
                        Id = op.Cheese.Id,
                        Name = op.Cheese.Name
                    },
                    SauceId = op.SauceId,
                    Sauce = new SauceDTO
                    {
                        Id = op.Sauce.Id,
                        Name = op.Sauce.Name
                    },
                    OrderId = op.OrderId,
                    PizzaToppings = op.PizzaToppings.Select(pt => new PizzaToppingDTO
                    {
                        Id = pt.Id,
                        PizzaId = pt.PizzaId,
                        ToppingId = pt.ToppingId,
                        Topping = new ToppingDTO
                        {
                            Id = pt.Topping.Id,
                            Name = pt.Topping.Name
                        }
                    }).ToList()
                }).ToList()
            });

        }
        catch (Exception ex)
        {
            return NotFound($"{ex}");
        };
    }

    // [HttpPost("{id}/{userId}/complete")]
    // [Authorize]
    // public IActionResult Complete(int id, int userId)
    // {
    //     var toAdd = new ChoreCompletion
    //     {
    //         UserProfileId = userId,
    //         ChoreId = id,
    //         CompletedOn = DateTime.Now
    //     };

    //     _dbContext.ChoreCompletions.Add(toAdd);
    //     _dbContext.SaveChanges();
    //     return NoContent();
    // }

    // [HttpPost("create")]
    // [Authorize(Roles = "Admin")]
    // public IActionResult Create(Chore c)
    // {
    //     _dbContext.Chores.Add(c);
    //     _dbContext.SaveChanges();
    //     return Created($"{c.Id}", c);
    // }

    // [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    // public IActionResult Update(int id, Chore c)
    // {
    //     Chore foundC = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
    //     if (foundC == null)
    //     {
    //         return BadRequest("Id param does not match any chore id");
    //     }
    //     foundC.Name = c.Name;
    //     foundC.Difficulty = c.Difficulty;
    //     foundC.ChoreFrequencyDays = c.ChoreFrequencyDays;
    //     _dbContext.SaveChanges();
    //     return Created($"api/chore/{foundC.Id}", foundC);
    // }

    // [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")]
    // public IActionResult Delete(int id)
    // {
    //     Chore foundC = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
    //     if (foundC == null)
    //     {
    //         return BadRequest("Id param does not match any chore id");
    //     }
    //     _dbContext.Chores.Remove(foundC);
    //     _dbContext.SaveChanges();
    //     return NoContent();
    // }

    // [HttpPost("{id}/assign/{userId}")]
    // [Authorize(Roles = "Admin")]
    // public IActionResult Assign(int id, int userId)
    // {
    //     var assignment = new ChoreAssignment
    //     {
    //         UserProfileId = userId,
    //         ChoreId = id
    //     };

    //     _dbContext.ChoreAssignments.Add(assignment);
    //     _dbContext.SaveChanges();
    //     return NoContent();
    // }

    // [HttpPost("{id}/unassign/{userId}")]
    // [Authorize(Roles = "Admin")]
    // public IActionResult Unassign(int id, int userId)
    // {
    //     var found = _dbContext.ChoreAssignments
    //     .Where(ca => ca.ChoreId == id && ca.UserProfileId == userId);

    //     foreach(var f in found)
    //     {
    //         _dbContext.ChoreAssignments.Remove(f);
    //     }
        
    //     _dbContext.SaveChanges();
    //     return NoContent();
    // }

    // [HttpGet("my/{userId}")]
    // [Authorize]
    // public IActionResult GetMy(int userId)
    // {
    //     var foundAssignments = _dbContext.ChoreAssignments
    //     .Include(c => c.Chore).ThenInclude(chore => chore.ChoreCompletions)
    //     .Where(c => c.UserProfileId == userId);

    //     if(foundAssignments == null)
    //     {
    //         return NoContent();
    //     }

    //     return Ok(foundAssignments.Select(a => new ChoreAssignmentDTO
    //     {
    //         Id = a.Id,
    //         UserProfileId = a.UserProfileId,
    //         ChoreId = a.ChoreId,
    //         Chore = new ChoreDTO
    //         {
    //             Id = a.Chore.Id,
    //             Name = a.Chore.Name,
    //             Difficulty = a.Chore.Difficulty,
    //             ChoreFrequencyDays = a.Chore.ChoreFrequencyDays,
    //             ChoreCompletions = a.Chore.ChoreCompletions.Select(cp => new ChoreCompletionDTO
    //             {
    //                 Id = cp.Id,
    //                 UserProfileId = cp.UserProfileId,
    //                 ChoreId = cp.ChoreId,
    //                 CompletedOn = cp.CompletedOn
    //             }).ToList()
    //         }
    //     }).ToList()
    //     );
        
    // }
}
