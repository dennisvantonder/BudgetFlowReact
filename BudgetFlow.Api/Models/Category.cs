using System.ComponentModel.DataAnnotations;

namespace BudgetFlow.Api.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}
