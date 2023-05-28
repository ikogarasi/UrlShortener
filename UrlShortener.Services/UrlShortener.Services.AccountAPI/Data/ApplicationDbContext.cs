using Microsoft.EntityFrameworkCore;
using UrlShortener.Services.AccountAPI.Constants;
using UrlShortener.Services.AccountAPI.Models;

namespace UrlShortener.Services.AccountAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public DbSet<UserEntity> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserEntity>()
            .Property(user => user.Role)
            .HasDefaultValue(RoleType.USER.ToString());
    }
}
