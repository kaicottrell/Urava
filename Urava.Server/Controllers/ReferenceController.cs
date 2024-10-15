using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Urava.Server.Documents;
using Urava.Server.Interfaces;
using Urava.Server.Repository;

namespace Urava.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReferenceController : ControllerBase
    {
        private readonly IRepository<Reference> _referenceRepo;
        private readonly UserManager<ApplicationUser> _userManager;

        public ReferenceController(IRepository<Reference> referenceRepo, UserManager<ApplicationUser> userManager)
        {
            _referenceRepo = referenceRepo;
            _userManager = userManager;
        }
        /// <summary>
        /// Takes a reference from a form on the front end passed in as type reference, then it adds the reference / saves it to the database.
        /// </summary>
        /// <param name="reference"></param>
        /// <returns></returns>
        /// 
        [HttpPost]
        public IActionResult AddReference([FromBody] Reference reference)
        {
            var userId = _userManager.GetUserId(User);
            //save in the database
            reference.UserId = new ObjectId(userId);
            _referenceRepo.Add(reference);
            _referenceRepo.SaveChanges();
            return Ok();
        }
    }
}
