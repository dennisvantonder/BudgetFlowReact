using System.ComponentModel.DataAnnotations;

namespace BudgetFlow.Api.Dtos
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }

    public class RegisterDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [MinLength(6)]
        public string FullName { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
    }
}
