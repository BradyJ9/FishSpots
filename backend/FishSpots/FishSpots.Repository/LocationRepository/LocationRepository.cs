using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;

namespace FishSpots.Repository.LocationRepository
{
    public class LocationRepository(DatabaseFactory databaseFactory) : ILocationRepository
    {
        public async Task<List<Location>> GetAllLocationsAsync()
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Location";

            return (await connection.QueryAsync<Location>(sql)).ToList();
        }

        public async Task<Location> GetLocationByIdAsync(int locationId)
        {
            throw new NotImplementedException();
        }

        public async Task<int> InsertLocationAsync(Location location)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "INSERT INTO Location (LocationName, Lat, Long)" +
                "VALUES (@LocationName, @Lat, @Long)";

            return await connection.ExecuteAsync(sql, location);
        }
    }
}
