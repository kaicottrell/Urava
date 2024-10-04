using System.ComponentModel.DataAnnotations;

namespace Urava.Server.Models
{
    /// <summary>
    /// REVISIT: This class is a DTO? Transfers data between the server and the client.
    /// </summary>
    public class UserDTO
    {
        [Required]
        public string FirstName { get; set; }
        [Required] public string LastName { get;set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
