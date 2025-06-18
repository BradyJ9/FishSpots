using System.Data;
using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;
using FishSpots.Repository.Helpers;

namespace FishSpots.Repository.CatchRepository
{
    public class CatchRepository(DatabaseFactory databaseFactory) : ICatchRepository
    {
        public async Task<int> DeleteCatchByIdAsync(int catchId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "DELETE FROM Catch WHERE CatchID = @CatchId";

            return await connection.ExecuteAsync(sql, new { CatchId = catchId });
        }

        public async Task<List<Catch>> GetAllCatchesAsync()
        {
            using var connection = databaseFactory.CreateDbConnection();
            var sql = "SELECT * FROM Catch c " +
                "JOIN Outing o ON c.OutingID = o.OutingID " +
                "ORDER BY o.OutingDate DESC ";
            sql = SqlGetHelper.GetWithLimitsSql(databaseFactory.GetDbProvider(),sql, 25);

            return (await connection.QueryAsync<Catch>(sql)).ToList();
        }

        public async Task<List<Catch>> GetAllCatchesWithImagesAsync()
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Catch c " +
                       "JOIN Outing o ON c.OutingID = o.OutingID " +
                       "WHERE c.ImageUrl IS NOT NULL AND c.ImageUrl != '' " +
                       "ORDER BY o.OutingDate DESC ";
            sql = SqlGetHelper.GetWithLimitsSql(databaseFactory.GetDbProvider(), sql, 25);

            return (await connection.QueryAsync<Catch>(sql)).ToList();
        }

        public async Task<Catch?> GetCatchByIdAsync(int catchId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Catch WHERE CatchID = @CatchId;";

            return await connection.QueryFirstOrDefaultAsync<Catch>(sql, new
            {
                CatchId = catchId
            });
        }

        public async Task<List<Catch>?> GetCatchesByOutingAsync(int outingId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Catch WHERE OutingID = @OutingId;";

            return (await connection.QueryAsync<Catch>(sql, new
            {
                OutingId = outingId
            })).ToList();
        }

        public async Task<List<Catch>?> GetCatchesBySpeciesAsync(string species)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Catch WHERE Species = @Species;";

            return (await connection.QueryAsync<Catch>(sql, new
            {
                Species = species
            })).ToList();
        }

        public async Task<Location?> GetCatchLocationAsync(int catchId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT l.* " +
                "FROM Catch c " +
                "JOIN Outing o ON c.OutingID = o.OutingID " +
                "JOIN Location l ON o.LocationID = l.LocationID " +
                "WHERE c.CatchID = @CatchId;";

            return await connection.QueryFirstOrDefaultAsync<Location>(sql, new
            {
                CatchId = catchId
            });
        }

        public async Task<int> InsertCatchAsync(Catch cat)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = SqlInsertHelper.GetInsertWithReturnSql(databaseFactory.GetDbProvider(),
                "Catch",
                "OutingId, Species, CatchLength, CatchWeight, ImageUrl",
                "@OutingId, @Species, @CatchLength, @CatchWeight, @ImageUrl",
                "CatchId");

            return await connection.QuerySingleAsync<int>(sql, cat);
        }

        public async Task<int> UpdateCatchByIdAsync(Catch cat, int catchId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = @"UPDATE Catch  
                       SET OutingId = @OutingId,
                           Species = @Species,
                           CatchLength = @CatchLength,
                           CatchWeight = @CatchWeight,
                           Likes = @Likes,
                           ImageUrl = @ImageUrl,
                           UpdatedAt = @UpdatedAt
                       WHERE CatchID = @CatchId";

            return await connection.ExecuteAsync(sql, new
            {
                cat.OutingId,
                cat.Species,
                cat.CatchLength,
                cat.CatchWeight,
                cat.Likes,
                cat.ImageUrl,
                UpdatedAt = DateTime.UtcNow,
                CatchId = catchId
            });
        }

        public async Task<int> InsertCatchesIntoOutingAsync(List<Catch> catches, int outingId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            return await InsertCatchesIntoOutingAsync(connection, catches, outingId);
        }

        public async Task<int> InsertCatchesIntoOutingAsync(IDbConnection connection, List<Catch> catches, int outingId)
        {
            var sql = "INSERT INTO Catch (OutingId, Species, CatchLength, CatchWeight, ImageUrl) " +
          "VALUES (@OutingId, @Species, @CatchLength, @CatchWeight, @ImageUrl)";

            foreach (var catchItem in catches)
            {
                await connection.ExecuteAsync(sql, new
                {
                    OutingId = outingId,
                    catchItem.Species,
                    catchItem.CatchLength,
                    catchItem.CatchWeight,
                    catchItem.ImageUrl
                });
            }

            return catches.Count;
        }
    }
}
