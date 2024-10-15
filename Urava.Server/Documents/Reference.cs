using Urava.Server.Documents;
using MongoDbGenericRepository.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Urava.Server.Documents
{
    public class Reference : Document
    {
        [JsonIgnore]
        public ObjectId UserId { get; set; }

        public string Email { get; set; } = "No Email Found";

        public string FullName { get; set; } = "No Name Found";
        [Phone] 
        public string PhoneNumber { get; set; } = "No Phone Number Found";

        public string CurrentTitle { get; set; } = "No Current Title Found";


        public string RelationshipSummary { get; set; } = "No Relationship Summary Found";
    }
}
