using Urava.Server.Documents;
using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
    /// <summary>
    /// JobPostings hold the information relating to a job posting that was applied for or saved by the user.
    /// </summary>
    [CollectionName("JobPostings")]
    public class JobPosting : Document
    {
        public string Title { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public string Company { get; set; } = String.Empty;
        public string? Location { get; set; }
        public DateTime PostedDate { get; set; } = DateTime.UtcNow;
        public string? PostingURL { get; set; }
        public int? YearsOfExperience { get; set; }
        public string Type { get; set; } = "Full-time";
        public string[] Skills { get; set; } = Array.Empty<string>();
    }
}
