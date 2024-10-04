using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
    /// <summary>
    /// This model represents the data saved in documents for common interview questions and answers.
    /// </summary>
    [CollectionName("InterviewQuestionAnswers")]
    public class InterviewQuestionAnswer : Document
    {
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;

        public int FrequencyCount { get; set; } = 0;
        public ObjectId UserId { get; set; }
        /// <summary>
        /// Corresponding JobApplicationId if this question was asked during an interview.
        /// </summary>
        public ObjectId? JobApplicationId { get; set; }
    }
}
