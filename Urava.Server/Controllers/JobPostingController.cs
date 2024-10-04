using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Urava.Server.Documents;
using Urava.Server.Interfaces;
using Urava.Server.Repository;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;


namespace Urava.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class JobPostingController : ControllerBase
    {
        private readonly IRepository<JobPosting> _jobPostingRepo;
        private readonly UserManager<ApplicationUser> _userManager;

        public JobPostingController(IRepository<JobPosting> jobPostingRepo, UserManager<ApplicationUser> userManager)
        {
            _jobPostingRepo = jobPostingRepo;
            _userManager = userManager;
        }

        // Create a new job posting
        [HttpPost]
        public IActionResult CreateJobPosting([FromBody] JobPosting jobPosting)
        {
            if (jobPosting == null)
            {
                return BadRequest("Job posting is null.");
            }

            //var userId = _userManager.GetUserId(User);
            //if (userId == null)
            //{
            //    return Unauthorized("User is not logged in.");
            //}
            //jobPosting.UserId = new ObjectId(userId);
            jobPosting.UserId = ObjectId.GenerateNewId();

            _jobPostingRepo.Add(jobPosting);
            _jobPostingRepo.SaveChanges();

            return CreatedAtAction(nameof(GetJobPostingById), new { id = jobPosting._id }, jobPosting);
        }

        // Get a job posting by ID
        [HttpGet]
        public async Task<IActionResult> GetJobPostingById(ObjectId id)
        {
            var jobPosting = await _jobPostingRepo.GetById(id);

            if (jobPosting == null)
            {
                return NotFound();
            }

            return Ok(jobPosting);
        }
        // Get all job postings associated with the logged-in user
        [HttpGet("GetAllJobPostings")]
        public async Task<IActionResult> GetAllJobPostings()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in.");
            }

            var objectId = new ObjectId(userId);
            var jobPostings = await _jobPostingRepo.GetAll();
            var userJobPostings = jobPostings.Where(jp => jp.UserId == objectId).ToArray();

            return Ok(userJobPostings);
        }

        // Update an existing job posting
        [HttpPut]
        public  IActionResult UpdateJobPosting([FromBody] JobPosting jobPosting)
        {
            if (jobPosting == null)
            {
                return BadRequest("Job posting is null or ID mismatch.");
            }

            var existingJobPosting = _jobPostingRepo.GetById(jobPosting._id);
            if (existingJobPosting == null)
            {
                return NotFound();
            }

            _jobPostingRepo.Update(jobPosting);

            return NoContent();
        }

        // Delete a job posting
        [HttpDelete("{id}")]
        public IActionResult DeleteJobPosting(string id)
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ID format.");
            }


            var jobPosting = _jobPostingRepo.GetById(objectId);
            if (jobPosting == null)
            {
                return NotFound();
            }

            _jobPostingRepo.Remove(objectId);

            return NoContent();
        }
    }
}
