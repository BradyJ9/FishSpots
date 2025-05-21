using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;

namespace FishSpots.Repository.LocationImageRepository
{
    public class LocationImageRepository(DatabaseFactory databaseFactory) : ILocationImageRepository
    {
        public async Task<int> DeleteLocationImageByIdAsync(int imageId)
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = "DELETE FROM LocationImages WHERE ImageID = @ImageId";

            return await connection.ExecuteAsync(sql, new { ImageId = imageId });
        }

        public async Task<List<LocationImage>> GetLocationImagesByIdAsync(int locationId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM LocationImages WHERE LocationID = @LocationId";

            return (await connection.QueryAsync<LocationImage>(sql, new
            {
                LocationId = locationId
            })).ToList();
        }

        public async Task<int> InsertLocationImageAsync(LocationImage locationImage)
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = "INSERT INTO LocationImages (LocationId, StoragePath)" +
                "VALUES (@LocationId, @StoragePath)";

            return await connection.ExecuteAsync(sql, locationImage);
        }

        public async Task<int> UpdateLocationImageByIdAsync(LocationImage locationImage, int imageId)
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = @"UPDATE LocationImages
                        SET LocationId = @LocationId,
                            StoragePath = @StoragePath
                        WHERE ImageID = @ImageId";

            return await connection.ExecuteAsync(sql, new
            {
                locationImage.LocationId,
                locationImage.StoragePath,
                ImageId = imageId
            });
        }
    }
}
