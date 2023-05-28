using UrlShortener.Services.AccountAPI.Models;

namespace UrlShortener.Services.AccountAPI.Services
{
    public interface ITokenService
    {
        string BuildToken(UserEntity user);
    }
}