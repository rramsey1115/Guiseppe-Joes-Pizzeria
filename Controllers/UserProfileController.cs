using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GuiseppeJoes.Data;
using Microsoft.EntityFrameworkCore;
using GuiseppeJoes.Models;
using Microsoft.AspNetCore.Identity;

namespace GuiseppeJoes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private GuiseppeJoesDbContext _dbContext;

    public UserProfileController(GuiseppeJoesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                IdentityUserId = up.IdentityUserId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName
            })
        .ToList());
    }

    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        var up = _dbContext
        .UserProfiles
        .Include(up => up.IdentityUser)
        .SingleOrDefault(up => up.Id == id);

        if (up == null)
        {
            return NotFound("Id doesn't exist on a userProfile");
        }

        return Ok(new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            IdentityUserId = up.IdentityUserId,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName
        }

        );
    }

}