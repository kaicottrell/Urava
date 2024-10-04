using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Urava.Server.Documents;
using Urava.Server.Models;
using System.Threading.Tasks;

namespace Urava.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(UserDTO user)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser appUser = new ApplicationUser
                {
                    UserName = user.Email,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                };
                IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);

                if (result.Succeeded)
                {
                    return Ok(new { message = "User Created Successfully" });
                }
                else
                {
                    var errors = new List<string>();
                    foreach (IdentityError error in result.Errors)
                    {
                        errors.Add(error.Description);
                    }
                    return BadRequest(new { errors });
                }
            }

            return BadRequest(ModelState);
        }
    }
}
