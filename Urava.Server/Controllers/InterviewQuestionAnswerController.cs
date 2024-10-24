using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Security.Cryptography.X509Certificates;
using Urava.Server.Documents;
using Urava.Server.Interfaces;
using Urava.Server.Repository;

namespace Urava.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InterviewQuestionAnswerController : Controller
    {
        private readonly IRepository<InterviewQuestionAnswer> _interviewQuestionAnswerRepo;
        private readonly UserManager<ApplicationUser> _userManager;
        public InterviewQuestionAnswerController(IRepository<InterviewQuestionAnswer> interviewQuestionAnswerRepo, UserManager<ApplicationUser> userManager)
        {
            _interviewQuestionAnswerRepo = interviewQuestionAnswerRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetAllInterviewQuestionAnswers()
        {
            var userId = _userManager.GetUserId(User);
            var oUserId = new ObjectId(userId);
            var allUsersInterviewQAs = _interviewQuestionAnswerRepo.GetAll(iqa => iqa.UserId == oUserId);
            return Ok(allUsersInterviewQAs);    
        }
        [HttpPost]
        public IActionResult AddInterviewQuestionAnswer([FromBody]InterviewQuestionAnswerDto interviewQuestionAnswerDTO)
        {
            var userId = _userManager.GetUserId(User);
            var oUserId = new ObjectId(userId);

            var interviewQuestionAnswer = new InterviewQuestionAnswer
            {
                Question = interviewQuestionAnswerDTO.Question,
                Answer = interviewQuestionAnswerDTO.Answer,
                FrequencyCount = interviewQuestionAnswerDTO.FrequencyCount,
                JobApplicationId = interviewQuestionAnswerDTO.JobApplicationId,
                UserId = oUserId
            };

            interviewQuestionAnswer.UserId = oUserId;
            _interviewQuestionAnswerRepo.Add(interviewQuestionAnswer);
            _interviewQuestionAnswerRepo.SaveChanges();
            return Ok(interviewQuestionAnswer);
        }
        // from body here?
        [HttpDelete]
        public IActionResult DeleteInterviewQuestionAnswer(ObjectId interviewQAId)
        {
            var interviewQA = _interviewQuestionAnswerRepo.GetById(interviewQAId);
            _interviewQuestionAnswerRepo.Remove(interviewQAId);
            _interviewQuestionAnswerRepo.SaveChanges();
            return Ok(interviewQA);
        }
    }
}
