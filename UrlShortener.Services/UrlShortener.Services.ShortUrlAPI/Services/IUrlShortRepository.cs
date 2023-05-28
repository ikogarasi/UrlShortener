using UrlShortener.Services.ShortUrlAPI.Models;
using UrlShortener.Services.ShortUrlAPI.Models.Dto;

namespace UrlShortener.Services.ShortUrlAPI.Repository
{
    public interface IUrlShortService
    {
        Task<ShortUrl> CreateShortUrl(ShortUrlDto urlDto);
        Task DeleteUrl(int id);
        Task<IEnumerable<ShortUrl>> GetAllUrls();
        Task<ShortUrl?> GetUrlById(int urlId);
        Task<string> GetUrlByShort();
    }
}