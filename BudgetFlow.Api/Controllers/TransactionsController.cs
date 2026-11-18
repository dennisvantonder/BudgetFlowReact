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
    public class TransactionsController(AppDbContext context) : ControllerBase
    {
        [HttpGet("get")]
        public async Task<IActionResult> GetTransactions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authorized!");

            var transactions = await context.Transactions.Where(t => t.UserId == userId).Select(t => new TransactionDto
            {
                Id = t.Id,
                Description = t.Description,
                Type = t.Type,
                CategoryName = t.Category.Name,
                Amount = t.Amount,
                Date = t.Date
            }).ToListAsync();
            return Ok(transactions);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTransaction([FromBody] AddTransactionDto transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authorized!");

            // check for the category existence and ownership
            // if category does not exist or does not belong to the user, return NotFound
            var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == transaction.CategoryId && c.UserId == userId);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            var newTransaction = new Transaction
            {
                Description = transaction.Description,
                Amount = transaction.Amount,
                Date = transaction.Date,
                Category = category,
                CategoryId = category.Id,
                Type = transaction.Type,
                UserId = userId
            };
            context.Transactions.Add(newTransaction);
            await context.SaveChangesAsync();

            return Ok(new TransactionDto
            {
                Amount = newTransaction.Amount,
                CategoryName = newTransaction.Category.Name,
                Date = newTransaction.Date,
                Description = newTransaction.Description,
                Id = newTransaction.Id,
                Type = newTransaction.Type
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authorized!");

            // check if the transaction exists and belongs to the user
            var transaction = await context.Transactions.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (transaction == null)
            {
                return NotFound();
            }

            context.Transactions.Remove(transaction);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
