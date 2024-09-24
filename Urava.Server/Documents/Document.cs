using MongoDB.Bson;

namespace Urava.Server.Documents
{
    public abstract class Document : IDocument
    {
        public ObjectId Id { get; set; }
        public DateTime CreatedAt => Id.CreationTime;
        public int Version { get; set; }
    }
}
