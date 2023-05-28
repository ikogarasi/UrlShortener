using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using UrlShortener.Services.AccountAPI.Constants;

namespace UrlShortener.Services.AccountAPI.Models
{
    public class UserEntity
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(3), MaxLength(40)]
        public string UserName { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string PasswordSalt { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
