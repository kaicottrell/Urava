using Urava.Server.Documents;
using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
    /// <summary>
    /// JobPostings hold the information relating to a job posting that was applied for or saved by the user.
    /// </summary>
 //   [CollectionName("JobPostings")]
    public class JobPosting : Document
    {
        public string JobTitle { get; set; } = "No Job Title Found";
        public string Description { get; set; } ="No Description Found";
        public string Company { get; set; } = "No Company Found";
        public string? Location { get; set; }
        public DateTime PostedDate { get; set; } = DateTime.UtcNow;
        public string? PostingURL { get; set; }
        public int? YearsOfExperience { get; set; }
        public JobType Type { get; set; } = JobType.FullTime;
        public string[] Skills { get; set; } = Array.Empty<string>();
        // TODO: Add association with a user

    }
    public enum JobType
    {
        FullTime, PartTime, Contract, Internship
    }
}
