using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Security.Cryptography;
using UrlShortener.Services.AccountAPI.Data;
using UrlShortener.Services.AccountAPI.Models;
using UrlShortener.Services.AccountAPI.Models.Dto;
using UrlShortener.Services.AccountAPI.Exceptions;
using UrlShortener.Services.AccountAPI.Services;

namespace UrlShortener.Services.AccountAPI.Repository;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ITokenService _tokenService;

    public UserRepository(ApplicationDbContext dbContext, ITokenService tokenService)
    {
        _dbContext = dbContext;
        _tokenService = tokenService;
    }

    /// <inheritdoc/>
    public async Task RegisterUser(AuthDto authDto)
    {    
        var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == authDto.Email);

        if (user != null)
        {
            throw new AuthorizationException($"{user.Email} is already in use.");
        }

        CreatePasswordHash(authDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

        user = new()
        {
            Email = authDto.Email,
            UserName = authDto.UserName,
            PasswordHash = JsonConvert.SerializeObject(passwordHash),
            PasswordSalt = JsonConvert.SerializeObject(passwordSalt),
        };

        await _dbContext.AddAsync(user);
        await _dbContext.SaveChangesAsync();
    }

    /// <inheritdoc/>
    public async Task<string> Login(AuthDto authDto)
    {
        UserEntity user = await _dbContext.Users.FirstOrDefaultAsync(i => i.Email == authDto.Email);

        if (user == null)
        {
            throw new AuthenticationException("Log in failure. Try to verify your credentials.");
        }

        byte[] passwordHash = JsonConvert.DeserializeObject<byte[]>(user.PasswordHash);
        byte[] passwordSalt = JsonConvert.DeserializeObject<byte[]>(user.PasswordSalt);

        if (!VerifyPasswordHash(authDto.Password, passwordHash, passwordSalt))
        {
            throw new AuthenticationException("Log in failure. Try to verify your credentials.");
        }

        return _tokenService.BuildToken(user);
    }

    /// <inheritdoc/>
    public async Task<UserDto> GetUserById(int userId)
    {
        var userData = await _dbContext.Users.FirstOrDefaultAsync(i => i.UserId == userId);

        return new()
        {
            UserId = userData.UserId,
            UserName = userData.UserName,
        };
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA256();

        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA256(passwordSalt);

        var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return computeHash.SequenceEqual(passwordHash);
    }
}
