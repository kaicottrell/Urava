using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
    /// <summary>
    /// Saves commonly asked questions and answers for job applications.
    /// </summary>
    [CollectionName("ApplicationQuestionAnswers")]
    public class ApplicationQuestionAnswer : Document
    {
        /// <summary>
        /// The question being asked.
        /// </summary>
        public string Question { get; set; } = string.Empty;

        /// <summary>
        /// The answer to the question.
        /// </summary>
        public string Answer { get; set; } = string.Empty;
    }
}
