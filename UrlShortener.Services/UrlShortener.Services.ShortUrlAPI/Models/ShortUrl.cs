using System.ComponentModel.DataAnnotations;

namespace UrlShortener.Services.ShortUrlAPI.Models
{
    public class ShortUrl
    {
        [Key]
        public int UrlId { get; set; }

        [Required]
        public int CreatedById { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public string ShortedUrl { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }
    }
}
