using Urava.Server.Data;
using Urava.Server.Documents;
using Urava.Server.Interfaces;
using Urava.Server.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Urava.Server.Repository;
using MongoDB.Bson;


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
    );



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// some comments
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


