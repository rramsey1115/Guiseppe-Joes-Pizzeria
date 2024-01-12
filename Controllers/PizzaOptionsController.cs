using GuiseppeJoes.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GuiseppeJoes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaOptionsController : ControllerBase
{
    private GuiseppeJoesDbContext _dbContext;

    public PizzaOptionsController(GuiseppeJoesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet("cheese")]
    [Authorize]
    public IActionResult GetCheeses()
    {
        try
        {
            return Ok(_dbContext.Cheeses);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex}");
        }
    }

    [HttpGet("sauce")]
    [Authorize]
    public IActionResult GetSauces()
    {
        try
        {
            return Ok(_dbContext.Sauces);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex}");
        }
    }


    [HttpGet("size")]
    [Authorize]
    public IActionResult GetSizes()
    {
        try
        {
            return Ok(_dbContext.Sizes);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex}");
        }
    }

    [HttpGet("topping")]
    [Authorize]
    public IActionResult GetToppings()
    {
        try
        {
            return Ok(_dbContext.Toppings);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex}");
        }
    }

    [HttpGet("pizzatopping")]
    [Authorize]
    public IActionResult GetPizzaToppings()
    {
        try
        {
            return Ok(_dbContext.PizzaToppings);
        }
        catch (Exception ex)
        {
            return BadRequest($"{ex}");
        }
    }


}