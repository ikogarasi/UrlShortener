using UrlShortener.Services.ShortUrlAPI.Models;
using UrlShortener.Services.ShortUrlAPI.Models.Dto;

namespace UrlShortener.Services.ShortUrlAPI.Repository
{
    public interface IUrlShortService
    {
        /// <summary>
        /// Creates short url
        /// </summary>
        /// <param name="urlDto">Dto with url to short</param>
        /// <returns>Short url entity</returns>
        Task<ShortUrl> CreateShortUrl(ShortUrlDto urlDto);
        
        /// <summary>
        /// Deletes url by id
        /// </summary>
        /// <param name="id">id of entity to delete</param>
        Task DeleteUrl(int id);
        
        /// <summary>
        /// Get all urls
        /// </summary>
        /// <returns>List of url entities</returns>
        Task<IEnumerable<ShortUrl>> GetAllUrls();
        
        /// <summary>
        /// Get url by id
        /// </summary>
        /// <param name="urlId">Id of entity to search</param>
        /// <returns>Url entity</returns>
        Task<ShortUrl?> GetUrlById(int urlId);
        
        /// <summary>
        /// Get url by its short equivalent
        /// </summary>
        /// <returns>Url</returns>
        Task<string> GetUrlByShort();
    }
}