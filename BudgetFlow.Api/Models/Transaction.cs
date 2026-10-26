using System.ComponentModel.DataAnnotations;

namespace BudgetFlow.Api.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}
