using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using MongoDB.Bson;

namespace Urava.Server.Documents
{
    [CollectionName("Roles")]
    public class ApplicationRole : MongoIdentityRole<ObjectId>
    {
    }
}
