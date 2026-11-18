using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetFlow.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AntiForgeryController(IAntiforgery antiforgery) : ControllerBase
    {
        [HttpGet("token")]
        [AllowAnonymous]
        public IActionResult GetAntiForgeryToken()
        {
            var tokens = antiforgery.GetAndStoreTokens(HttpContext);
            
            return Ok(new { token = tokens.RequestToken });
        }
    }
}
