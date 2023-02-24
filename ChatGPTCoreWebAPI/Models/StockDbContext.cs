using Microsoft.EntityFrameworkCore;

namespace ChatGPTCoreWebAPI.Models
{
    public class StockDbContext : DbContext
    {
        public StockDbContext(DbContextOptions<StockDbContext> options) : base(options)
        {

        }
        public DbSet<JsonStockData> jsd { get; set; }
        public DbSet<User> user { get; set; }
        public DbSet<ChatMessages> chatmessages { get; set; }
        public DbSet<Messages> messages { get; set; }

      /*  protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChatMessages>()
                .Property(c => c.Messages)
                .HasColumnName("Messages")
                .HasColumnType("int[,]");
        }*/
    }
}
