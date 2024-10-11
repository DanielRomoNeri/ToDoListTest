using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Model;

namespace ToDoListAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {
            
        }

        public DbSet<Lista> Listas { get; set; }
    }
}
