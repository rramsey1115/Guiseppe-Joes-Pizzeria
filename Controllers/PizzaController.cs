using GuiseppeJoes.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GuiseppeJoes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaController : ControllerBase
{
    private GuiseppeJoesDbContext _dbContext;

    public PizzaController(GuiseppeJoesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetPizza(int id)
    {
        try
        {
            var p = _dbContext.Pizzas
            .Include(pza => pza.Size)
            .Include(pza => pza.Cheese)
            .Include(pza => pza.Sauce)
            .Include(pza => pza.PizzaToppings).ThenInclude(pt => pt.Topping)
            .SingleOrDefault(pza => pza.Id == id);

            if (p == null)
            {
                return NotFound("No Pizza with given id found");
            }

            return Ok(new PizzaDTO
            {
                Id = p.Id,
                SizeId = p.SizeId,
                Size = new SizeDTO
                {
                    Id = p.Size.Id,
                    Name = p.Size.Name,
                    Price = p.Size.Price
                },
                CheeseId = p.CheeseId,
                Cheese = new CheeseDTO
                {
                    Id = p.Cheese.Id,
                    Name = p.Cheese.Name
                },
                SauceId = p.SauceId,
                Sauce = new SauceDTO
                {
                    Id = p.Sauce.Id,
                    Name = p.Sauce.Name
                },
                OrderId = p.OrderId,
                PizzaToppings = p.PizzaToppings.Select(pt => new PizzaToppingDTO
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
            });
            
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex}");
        }
    }


}