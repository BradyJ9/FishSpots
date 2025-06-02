using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;
using FishSpots.Repository.Helpers;

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

        public async Task<Location?> GetLocationByIdAsync(int locationId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Location WHERE LocationID = @LocationId;";

            return await connection.QueryFirstOrDefaultAsync<Location>(sql, new
            {
                LocationId = locationId
            });
        }

        public async Task<int> InsertLocationAsync(Location location)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = SqlInsertHelper.GetInsertWithReturnSql(databaseFactory.GetDbProvider(),
                "Location",
                "LocationName, Lat, Long, LocationDescription",
                "@LocationName, @Lat, @Long, @LocationDescription",
                "LocationId"
                );

            //Returns the ID of the location inserted; will throw an error if insertion is unsuccessful
            return await connection.QuerySingleAsync<int>(sql, location);
        }

        public async Task<int> UpdateLocationByIdAsync(Location location, int locationId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = @"UPDATE Location  
                       SET LocationName = @LocationName,  
                           LocationDescription = @LocationDescription,  
                           Lat = @Lat,  
                           Long = @Long,  
                           UpdatedAt = @UpdatedAt  
                       WHERE LocationID = @LocationId";

            return await connection.ExecuteAsync(sql, new
            {
                location.LocationName,
                location.LocationDescription,
                location.Lat,
                location.Long,
                UpdatedAt = DateTime.UtcNow,
                LocationId = locationId
            });
        }

        public async Task<int> DeleteLocationByIdAsync(int locationId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "DELETE FROM Location WHERE LocationID = @LocationId";

            return await connection.ExecuteAsync(sql, new { LocationId = locationId });
        }
    }
}
