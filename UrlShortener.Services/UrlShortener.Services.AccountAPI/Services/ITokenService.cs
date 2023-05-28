using UrlShortener.Services.AccountAPI.Models;

namespace UrlShortener.Services.AccountAPI.Services
{
    public interface ITokenService
    {
        /// <summary>
        /// Build jwt token for user
        /// </summary>
        /// <param name="user">authenticated user</param>
        /// <returns>jwt token</returns>
        string BuildToken(UserEntity user);
    }
}