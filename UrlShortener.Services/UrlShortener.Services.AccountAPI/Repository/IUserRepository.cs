using UrlShortener.Services.AccountAPI.Models.Dto;

namespace UrlShortener.Services.AccountAPI.Repository
{
    public interface IUserRepository
    {
        /// <summary>
        /// Authenticate user
        /// </summary>
        /// <param name="userDto">user credentials</param>
        /// <returns>jwt token</returns>
        Task<string> Login(AuthDto userDto);

        /// <summary>
        /// Authorize user
        /// </summary>
        /// <param name="userDto">user credentials</param>
        Task RegisterUser(AuthDto userDto);

        /// <summary>
        /// Get user by id
        /// </summary>
        /// <param name="userId">id of searched user</param>
        /// <returns>user data</returns>
        Task<UserDto> GetUserById(int userId);
    }
}