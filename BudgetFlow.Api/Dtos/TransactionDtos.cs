using System.ComponentModel.DataAnnotations;

namespace BudgetFlow.Api.Dtos
{
    public class TransactionDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string CategoryName { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

    public class AddTransactionDto
    {
        [Required]
        [MaxLength(200)]
        public string Description { get; set; }
        [Required]
        [Range(0.01, 100000000, ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Type { get; set; }
    }
}
