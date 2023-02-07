using Microsoft.EntityFrameworkCore;

namespace ChatGPTCoreWebAPI.Models
{
    public class StockDbContext : DbContext
    {
        public StockDbContext(DbContextOptions<StockDbContext> options) : base(options)
        {

        }
        public DbSet<JsonStockData> jsd { get; set; }
    }
}
