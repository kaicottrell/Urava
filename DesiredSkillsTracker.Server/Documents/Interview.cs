using MongoDbGenericRepository.Attributes;

namespace DesiredSkillsTracker.Server.Documents
{
    [CollectionName("Interviews")]
    public class Interview : Document
    {
        public DateTime DateTimeStart { get; set; }
        public DateTime DateTimeEnd { get; set; }
        public string? Description { get; set; } = string.Empty;
        public string Interviewer { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}
