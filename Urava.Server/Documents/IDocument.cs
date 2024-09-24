using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Urava.Server.Documents
{
    public interface IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        ObjectId _id { get; }
        DateTime CreatedAt { get; }
        int Version { get; }    
    }
}
