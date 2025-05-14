using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;

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

            var sql = "SELECT * FROM Catch";

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

        public async Task<int> InsertCatchAsync(Catch cat)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "INSERT INTO Catch (OutingId, Species, CatchLength, CatchWeight)" +
                "VALUES (@OutingId, @Species, @CatchLength, @CatchWeight)";

            return await connection.ExecuteAsync(sql, cat);
        }

        public async Task<int> UpdateCatchByIdAsync(Catch cat, int catchId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = @"UPDATE Catch  
                       SET OutingId = @OutingId,
                           Species = @Species,
                           CatchLength = @CatchLength,
                           CatchWeight = @CatchWeight,
                           UpdatedAt = @UpdatedAt
                       WHERE CatchID = @CatchId";

            return await connection.ExecuteAsync(sql, new
            {
                cat.OutingId,
                cat.Species,
                cat.CatchLength,
                cat.CatchWeight,
                UpdatedAt = DateTime.UtcNow,
                CatchId = catchId
            });
        }
    }
}
