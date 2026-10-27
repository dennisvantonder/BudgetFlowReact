using BudgetFlow.Api.Data;
using BudgetFlow.Api.Dtos;
using BudgetFlow.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BudgetFlow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController(AppDbContext context) : ControllerBase
    {
        [HttpGet("/get")]
        public async Task<IActionResult> GetCategories()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authorized!");

            var categories = await context.Categories.Where(c => c.UserId == userId).Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Icon = c.Icon
            }).ToListAsync();
            return Ok(categories);
        }

        [HttpPost("/add")]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryDto category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newCategory = new Category
            {
                Name = category.Name,
                Icon = category.Icon,
                UserId = category.UserId
            };

            if (await context.Categories.AnyAsync(c => c.Name == newCategory.Name && c.UserId == newCategory.UserId))
            {
                return BadRequest("Category with the same name already exists for this user.");
            }

            context.Categories.Add(newCategory);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("/update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryDto category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingCategory = await context.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                return NotFound();
            }
            existingCategory.Name = category.Name;
            existingCategory.Icon = category.Icon;
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("/delete/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            context.Categories.Remove(category);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
