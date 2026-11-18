using System.ComponentModel.DataAnnotations;

namespace BudgetFlow.Api.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
    }

    public class AddCategoryDto
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(200)]
        public string Icon { get; set; } = string.Empty;
    }
}
