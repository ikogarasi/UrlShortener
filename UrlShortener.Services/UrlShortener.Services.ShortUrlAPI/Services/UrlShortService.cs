using Microsoft.EntityFrameworkCore;
using System.Security;
using System.Security.Claims;
using UrlShortener.Services.ShortUrlAPI.Data;
using UrlShortener.Services.ShortUrlAPI.Models;
using UrlShortener.Services.ShortUrlAPI.Models.Dto;

namespace UrlShortener.Services.ShortUrlAPI.Repository
{
    public class UrlShortService : IUrlShortService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly HttpContext _httpContext;

        public UrlShortService(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContext = httpContextAccessor.HttpContext;
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<ShortUrl>> GetAllUrls()
            => await _dbContext.Urls.ToListAsync();

        /// <inheritdoc/>

        public async Task<ShortUrl?> GetUrlById(int urlId)
            => await _dbContext.Urls.FirstOrDefaultAsync(i => i.UrlId == urlId);

        /// <inheritdoc/>

        public async Task<ShortUrl> CreateShortUrl(ShortUrlDto urlDto)
        {
            if (!Uri.TryCreate(urlDto.Url, UriKind.Absolute, out var inputUrl))
            {
                throw new ArgumentException("Invalid url has been provided");
            }

            var matchedUrl = await _dbContext.Urls.FirstOrDefaultAsync(i => i.Url == urlDto.Url);

            if (matchedUrl != null)
            {
                throw new ArgumentException("Url should be unique");
            }

            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@abcdefghijklmopqrstuvwxyz";
            var randomStr = new string(Enumerable.Repeat(chars, 8)
                .Select(x => x[random.Next(x.Length)]).ToArray());

            var userClaims = _httpContext.User.Identity as ClaimsIdentity;
            var userId = Convert.ToInt32(userClaims?.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var shortedUrlEntity = new ShortUrl()
            {
                Url = urlDto.Url,
                ShortedUrl = randomStr,
                CreatedById = userId
            };

            await _dbContext.Urls.AddAsync(shortedUrlEntity);
            await _dbContext.SaveChangesAsync();

            return shortedUrlEntity;
        }

        /// <inheritdoc/>

        public async Task<string> GetUrlByShort()
        {
            var pattern = _httpContext.Request.Path.ToUriComponent().Trim('/');

            var url = await _dbContext.Urls.FirstOrDefaultAsync(x 
                => x.ShortedUrl.Trim().ToLower() == pattern.Trim().ToLower());

            if (url == null)
            {
                throw new ArgumentException("Invalid short url");
            }

            return url.Url;
        }

        /// <inheritdoc/>

        public async Task DeleteUrl(int id)
        {
            var entityToDelete = await _dbContext.Urls.FirstOrDefaultAsync(i => i.UrlId == id);

            if (entityToDelete == null)
            {
                throw new ArgumentException("Entity with such id does not exist");
            }

            if (_httpContext.User.IsInRole("ADMIN") || entityToDelete.CreatedById == Convert.ToInt32(_httpContext.User.FindFirstValue("sub")))
            {
                _dbContext.Remove(entityToDelete);
                await _dbContext.SaveChangesAsync();

                return;
            }

            throw new SecurityException("You have not permissions to delete it");
        }
    }
}
