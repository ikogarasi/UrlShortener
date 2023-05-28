using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using UrlShortener.Services.ShortUrlAPI.Data;
using UrlShortener.Services.ShortUrlAPI.Models.Dto;
using UrlShortener.Services.ShortUrlAPI.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(policy => {
    policy.AddPolicy("AllowAnyOrigins", _ =>
    {
        _.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddSwaggerGen(_ =>
{
    _.EnableAnnotations();
    _.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"Enter 'Bearer' [space] and your token",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    _.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
            },
            new List<string>()
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(_ => _.UseSqlServer(connectionString));

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(config =>
    {
        config.RequireHttpsMetadata = true;
        config.TokenValidationParameters = new TokenValidationParameters()
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Secret").Value)),
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateIssuer = false,
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("admin_role", policy =>
    {
        policy.RequireRole("ADMIN");
    });
});

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<IUrlShortService, UrlShortService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("AllowAnyOrigins");

app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/ShortUrl", [Authorize] async ([FromBody] ShortUrlDto urlDto, IUrlShortService service) =>
{
    try
    {
        var url = await service.CreateShortUrl(urlDto);

        return Results.Ok(url);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.MapGet("/GetAllUrls", async (IUrlShortService service) =>
{
    var entities = await service.GetAllUrls();

    return Results.Ok(entities);
});

app.MapGet("/GetUrlById", [Authorize] async (int urlId, IUrlShortService service) =>
{
    return Results.Ok(await service.GetUrlById(urlId));
});

app.MapDelete("/DeleteUrl", [Authorize] async (int id, IUrlShortService service) =>
{
    try
    {
        await service.DeleteUrl(id);

        return Results.Ok();
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});


app.MapFallback(async (IUrlShortService service) =>
{
    try
    {
        var url = await service.GetUrlByShort();

        return Results.Redirect(url);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
});

app.Run();
