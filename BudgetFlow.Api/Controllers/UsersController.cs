using BudgetFlow.Api.Dtos;
using BudgetFlow.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BudgetFlow.Api.Controllers
{
    /// <summary>
    /// This controller is for debug purposes only and should be deleted for a production app
    /// </summary>
    /// <param name="userManager"></param>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController(UserManager<AppUser> userManager) : ControllerBase
    {
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userManager.Users.Select(u => new UserDto
            {
                Id = u.Id,
                FullName = u.FullName,
                Email = u.Email ?? ""
            }).ToListAsync();
            return Ok(users);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null) return NotFound("User not found!");
            var result = await userManager.DeleteAsync(user);
            if (!result.Succeeded) return BadRequest("Failed to delete user.");
            return NoContent();
        }
    }
}
