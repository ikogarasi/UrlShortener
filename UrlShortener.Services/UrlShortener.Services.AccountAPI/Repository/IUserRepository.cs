using UrlShortener.Services.AccountAPI.Models.Dto;

namespace UrlShortener.Services.AccountAPI.Repository
{
    public interface IUserRepository
    {
        Task<string> Login(AuthDto userDto);
        Task RegisterUser(AuthDto userDto);
        Task<UserDto> GetUserById(int userId);
    }
}