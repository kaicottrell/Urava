using Urava.Server.Data;
using Urava.Server.Documents;
using Urava.Server.Interfaces;
using Urava.Server.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Urava.Server.Repository;
using MongoDB.Bson;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//Binds the value from the AppSettings into the MongoDbSettings instance
var mongoDbSConfig = builder.Configuration.GetSection(nameof(MongoDbSettings));
var mongoDbSettings = mongoDbSConfig.Get<MongoDbSettings>();


builder.Services.AddSingleton<IMongoDbSettings>(mongoDbSettings);
builder.Services.AddScoped<IMongoContext, MongoContext>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddMongoDbStores<ApplicationUser, ApplicationRole, ObjectId>(
        mongoDbSettings.ConnectionString, mongoDbSettings.DatabaseName
    )
    .AddApiEndpoints();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManger) =>
{
    await signInManger.SignOutAsync();
    return Results.Ok();
});

app.MapGet("pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    if (email == null)
    {
        return Results.Unauthorized();
    }
    return Results.Json(new { Email = email });
}).RequireAuthorization();

// some comments
app.UseHttpsRedirection();
app.MapIdentityApi<ApplicationUser>();
app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


