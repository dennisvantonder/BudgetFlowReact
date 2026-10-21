using BudgetFlow.Api.Dtos;
using BudgetFlow.Api.Models;
using BudgetFlow.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BudgetFlow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUser = await userManager.FindByEmailAsync(model.Email);
            if (currentUser != null)
            {
                return BadRequest("Email is already in use.");
            }

            var userName = model.FullName.Replace(" ", "").ToLower();
            var user = new AppUser
            {
                UserName = userName,
                Email = model.Email,
                FullName = model.FullName
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return BadRequest(ModelState);
            }

            var (accessToken, accessTokenExpires) = await tokenService.GenerateToken(user);
            var response = new AuthResponseDto
            {
                Token = accessToken,
                UserId = user.Id,
                Expiration = accessTokenExpires
            };

            return Ok(new { message = "User registered successfully", data = response });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            var result = await signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var (accessToken, accessTokenExpires) = await tokenService.GenerateToken(user);
            var response = new AuthResponseDto
            {
                Token = accessToken,
                UserId = user.Id,
                Expiration = accessTokenExpires
            };

            return Ok(new { message = "User logged in successfully", data = response });
        }
    }
}
