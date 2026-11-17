using BudgetFlow.Api.Dtos;
using BudgetFlow.Api.Models;
using BudgetFlow.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BudgetFlow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService,
        ILogger<AuthController> logger) : ControllerBase
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

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            // validate input
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid email or password");
            }
            var (accessToken, accessTokenExpires) = await tokenService.GenerateToken(user);
            var (refreshToken, refreshTokenExpires) = await tokenService.GenerateToken(user, 1440); // 1440 minutes = 24 hours

            // Set access token in HTTP-only cookie
            Response.Cookies.Append("__Host-BudgetFlow",
                accessToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = accessTokenExpires,
                    Path = "/"
                }
            );

            // Set refresh token in HTTP-only cookie
            Response.Cookies.Append("__Host-BudgetFlow-Refresh",
                refreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = refreshTokenExpires,
                    Path = "/"
                }
            );

            logger.LogInformation($"User {user.Email} logged in successfully");

            return Ok(new AuthResponseDto
            {
                Token = accessToken,
                Expiration = accessTokenExpires,
                UserId = user.Id.ToString()
            });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authorized!");

            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found.");
            var response = new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email ?? ""
            };
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            // Extract refresh token from cookie
            if (!Request.Cookies.TryGetValue("__Host-BudgetFlow-Refresh", out var refreshToken))
            {
                // Fallback: try to validate existing access token from main cookie
                if (!Request.Cookies.TryGetValue("__Host-BudgetFlow", out var accessToken))
                {
                    return Unauthorized("No token found");
                }

                // Try to validate and extract user from existing access token
                var principal = tokenService.ValidateToken(accessToken);
                if (principal == null)
                {
                    return Unauthorized("Invalid token");
                }

                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Invalid user in token");
                }

                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Unauthorized("User not found");
                }

                (refreshToken, _) = await tokenService.GenerateToken(user, 1440);
            }
            else
            {
                // Validate the refresh token
                var principal = tokenService.ValidateToken(refreshToken);
                if (principal == null)
                {
                    return Unauthorized("Invalid refresh token");
                }
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Invalid user in refresh token");
                }
                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Unauthorized("User not found");
                }
            }

            // Generate new access token
            var newPrincipal = tokenService.ValidateToken(refreshToken);
            var newUserId = newPrincipal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var newUser = await userManager.FindByIdAsync(newUserId!);

            // Update accessToken
            var (newAccessToken, newAccessTokenExpires) = await tokenService.GenerateToken(newUser!);
            Response.Cookies.Append("__Host-BudgetFlow",
               newAccessToken,
               new CookieOptions
               {
                   HttpOnly = true,
                   Secure = true,
                   SameSite = SameSiteMode.None,
                   Expires = newAccessTokenExpires,
                   Path = "/"
               }
           );

            logger.LogInformation($"User {newUser?.Email} refreshed token successfully");

            return Ok(new AuthResponseDto
            {
                Token = newAccessToken,
                Expiration = newAccessTokenExpires,
                UserId = newUser?.Id.ToString() ?? ""
            });
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Clear access token cookie
            Response.Cookies.Delete("__Host-BudgetFlow", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/"
            });

            // Clear refresh token cookie (if used)
            Response.Cookies.Delete("__Host-BudgetFlow-Refresh", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/"
            });

            logger.LogInformation($"User {userId} logged out");
            return Ok();
        }
    }
}
