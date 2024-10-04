using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
    /// <summary>
    /// This model represents the data saved in documents for common interview questions and answers.
    /// </summary>
    public class InterviewQuestionAnswer : Document
    {
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;

        //TODO reference user ID
        public int FrequencyCount { get; set; } = 0;
    }
}
