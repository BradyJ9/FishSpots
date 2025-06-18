using FishSpots.Infrastructure;
using FishSpots.Logic.CatchImageLogic;
using FishSpots.Logic.CatchLogic;
using FishSpots.Logic.LocationImageLogic;
using FishSpots.Logic.LocationLogic;
using FishSpots.Logic.OutingLogic;
using FishSpots.Repository.CatchImageRepository;
using FishSpots.Repository.CatchRepository;
using FishSpots.Repository.LocationImageRepository;
using FishSpots.Repository.LocationRepository;
using FishSpots.Repository.OutingRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200", "https://fishspots.us")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Dependency Injection
builder.Services.AddSingleton<DatabaseFactory>();

builder.Services.AddScoped<ILocationLogic, LocationLogic>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<IOutingLogic, OutingLogic>();
builder.Services.AddScoped<IOutingRepository, OutingRepository>();
builder.Services.AddScoped<ICatchLogic, CatchLogic>();
builder.Services.AddScoped<ICatchRepository, CatchRepository>();
builder.Services.AddScoped<ILocationImageLogic, LocationImageLogic>();
builder.Services.AddScoped<ILocationImageRepository, LocationImageRepository>();
builder.Services.AddScoped<ICatchImageLogic, CatchImageLogic>();
builder.Services.AddScoped<ICatchImageRepository, CatchImageRepository>();

var app = builder.Build();

app.UseCors("AllowAngularApp");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
