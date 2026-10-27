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
        [HttpGet("/get")]
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

        [HttpPost("/add")]
        public async Task<IActionResult> AddTransaction([FromBody] AddTransactionDto transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newTransaction = new Transaction
            {
                Description = transaction.Description,
                Amount = transaction.Amount,
                Date = transaction.Date,
                CategoryId = transaction.CategoryId,
                Type = transaction.Type,
                UserId = transaction.UserId
            };
            context.Transactions.Add(newTransaction);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("/delete/{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await context.Transactions.FindAsync(id);
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
