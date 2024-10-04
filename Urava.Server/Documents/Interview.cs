using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace Urava.Server.Documents
{
    [CollectionName("Interviews")]
    public class Interview : Document
    {
        public DateTime DateTimeStart { get; set; }
        public DateTime DateTimeEnd { get; set; }
        public string? Description { get; set; } = string.Empty;
        public string? InterviewerFullName { get; set; } = string.Empty;
        public string? Notes { get; set; }
        // Interviews are often tied to Job Applications
        public ObjectId? JobApplicationId { get; set; }
    }
}
