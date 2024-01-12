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
        .OrderBy(o => o.PlacedOnDate)
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

    [HttpPut("{id}/complete")]
    [Authorize]
    public IActionResult Complete(Order obj, int id)
    {
        try
        {

            Order o = _dbContext.Orders.FirstOrDefault(o => o.Id == id);
            if ( o == null )
            {
                return NotFound("no order with given id found");
            }

            o.Tip = obj.Tip;
            o.CompletedOnDate = DateTime.Now;
            if(obj.Delivery == true)
            {
                o.DriverId = obj.DriverId;
                o.Address = obj.Address;
            }

            _dbContext.SaveChanges();
            return Created($"api/order/${o.Id}", o);

        }
        catch ( Exception ex )
        {
            return BadRequest($"{ex}");
        }

    }

    [HttpPost("create")]
    [Authorize]
    public IActionResult Create(Order order)
    {
        _dbContext.Orders.Add(order);
        _dbContext.SaveChanges();
        return Created($"api/order/{order.Id}", order);
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(int id, Order obj)
    {
        try
        {
            Order o = _dbContext.Orders.SingleOrDefault(c => c.Id == id);
            if (o == null)
            {
                return BadRequest("Id param does not match any order id");
            }

            if (obj.Delivery == true)
            {
                o.Delivery = true;
                o.DriverId = obj.DriverId;
                o.Address = obj.Address;
                o.TableNumber = 0;
            }
            else
            {
                o.Delivery = false;
                o.DriverId = null;
                o.Address = null;
                o.TableNumber = obj.TableNumber;
            }

            _dbContext.SaveChanges();
            return Created($"api/Order/{o.Id}", o);
        }
        catch ( Exception ex)
        {
            return BadRequest($"Bad data: {ex}");
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(int id)
    {
        Order order = _dbContext.Orders.SingleOrDefault(o => o.Id == id);
        if (order == null)
        {
            return BadRequest("Id param does not match any Order id");
        }
        _dbContext.Orders.Remove(order);
        _dbContext.SaveChanges();
        return NoContent();
    }

}
