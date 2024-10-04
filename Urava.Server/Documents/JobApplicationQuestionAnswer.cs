using MongoDbGenericRepository.Attributes;
using MongoDB.Bson;
namespace Urava.Server.Documents
{
    [CollectionName("JobApplicationQuestionAnswers")]
    public class JobApplicationQuestionAnswer : Document
    {
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
        public ObjectId UserId { get; set; }
        // Add relation to specific job application
        /// <summary>
        /// Corresponding JobApplicationId if this question was asked on the job application
        /// </summary>
        public ObjectId? JobApplicationId { get; set; }
           
    }
}
