using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
    [CollectionName("JobApplications")]
    public class JobApplication : Document
    {
        public DateTime DateApplied { get; set; } = DateTime.UtcNow;
        public JobPosting JobPosting { get; set; } = new JobPosting();
        public Interview[] Interviews { get; set; } = Array.Empty<Interview>();
        public string? Notes { get; set; }
    }
}
