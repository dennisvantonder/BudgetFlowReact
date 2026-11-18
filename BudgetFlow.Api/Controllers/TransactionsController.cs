using AutoMapper;
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
    public class TransactionsController(AppDbContext context, IMapper mapper) : ControllerBase
    {
        [HttpGet("get")]
        public async Task<IActionResult> GetTransactions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authorized!");

            var transactions = await context.Transactions.Where(t => t.UserId == userId)
                .Select(t => mapper.Map<TransactionDto>(t)).ToListAsync();

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

            var newTransaction = mapper.Map<Transaction>(transaction);
            newTransaction.UserId = userId;
            newTransaction.Category = category;

            context.Transactions.Add(newTransaction);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<TransactionDto>(newTransaction));
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
