using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
   // [CollectionName("JobApplicationQuestionAnswers")]
    public class JobApplicationQuestionAnswer : Document
    {
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;

        // TODO: Add user ID
    }
}
