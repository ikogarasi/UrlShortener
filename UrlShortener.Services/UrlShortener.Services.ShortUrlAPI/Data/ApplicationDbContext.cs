using Microsoft.EntityFrameworkCore;
using UrlShortener.Services.ShortUrlAPI.Models;

namespace UrlShortener.Services.ShortUrlAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<ShortUrl> Urls { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShortUrl>()
                .Property(url => url.CreatedDate)
                .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}
