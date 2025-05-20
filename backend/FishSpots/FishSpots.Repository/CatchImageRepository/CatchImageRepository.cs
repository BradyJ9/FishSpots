using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;

namespace FishSpots.Repository.CatchImageRepository
{
    public class CatchImageRepository(DatabaseFactory databaseFactory) : ICatchImageRepository
    {
        public async Task<int> DeleteCatchImageByIdAsync(int imageId)
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = "DELETE FROM CatchImages WHERE ImageID = @ImageId";

            return await connection.ExecuteAsync(sql, new { ImageId = imageId });
        }

        public async Task<CatchImage?> GetCatchImageByIdAsync(int catchId)
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = "SELECT * FROM CatchImages WHERE CatchID = @CatchId";

            return await connection.QueryFirstOrDefaultAsync<CatchImage>(sql, new
            {
                CatchId = catchId
            });
        }

        public async Task<int> InsertCatchImageAsync(CatchImage catchImage)
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = "INSERT INTO CatchImages (CatchId, StoragePath)" +
                "VALUES (@CatchId, @StoragePath)";

            return await connection.ExecuteAsync(sql, catchImage);
        }

        public async Task<int> UpdateCatchImageByIdAsync(CatchImage catchImage, int imageId)
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = @"UPDATE CatchImages
                        SET CatchId = @CatchId,
                            StoragePath = @StoragePath
                        WHERE ImageID = @ImageId";

            return await connection.ExecuteAsync(sql, new
            {
                catchImage.CatchId,
                catchImage.StoragePath,
                ImageId = imageId
            });
        }
    }
}
