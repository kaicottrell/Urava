using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
   // [CollectionName("JobApplications")]
    public class JobApplication : Document
    {
        public DateTime DateApplied { get; set; } = DateTime.UtcNow;
        /// <summary>
        /// Reference to JobPostingId
        /// </summary>
        public ObjectId JobPostingId { get; set; }
        public string? Notes { get; set; }
    }
}
