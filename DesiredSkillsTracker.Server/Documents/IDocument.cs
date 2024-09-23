using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Urava.Server.Documents
{
    public interface IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        ObjectId Id { get; }
        DateTime CreatedAt { get; }
        int Version { get; }    
    }
}
