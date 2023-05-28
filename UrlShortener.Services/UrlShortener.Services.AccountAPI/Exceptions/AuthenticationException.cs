namespace UrlShortener.Services.AccountAPI.Exceptions;

public class AuthenticationException : Exception
{
    public AuthenticationException() { }

    public AuthenticationException(string message) : base(message) { }
}
