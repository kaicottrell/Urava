using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Urava.Server.Documents
{
    public abstract class Document : IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; } = ObjectId.GenerateNewId();
        public DateTime CreatedAt => DateTime.UtcNow;
        public int Version { get; set; }
    }
}
