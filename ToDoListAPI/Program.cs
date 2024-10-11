using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",//parametros para no tener conflictos con CORS
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexionSQL")));

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowAllOrigins");
// Configure the HTTP request pipeline.
app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.UseHttpsRedirection();



app.MapControllers();

app.Run();
