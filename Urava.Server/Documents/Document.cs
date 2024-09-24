using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Urava.Server.Documents
{
    public abstract class Document : IDocument
    {
        public string _id { get; set; }
        public DateTime CreatedAt => DateTime.UtcNow;
        public int Version { get; set; }
    }
}
