using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BudgetFlow.Api.Models
{
    public class AppUser : IdentityUser
    {
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;
    }
}
