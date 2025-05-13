using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FishSpots.Repository.OutingRepository
{
    public class OutingRepository(DatabaseFactory databaseFactory) : IOutingRepository
    {
        public async Task<int> DeleteOutingByIdAsync(int outingId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "DELETE FROM Outing WHERE OutingID = @OutingId";

            return await connection.ExecuteAsync(sql, new { OutingId = outingId });
        }

        public async Task<List<Outing>> GetAllOutingsAsync()
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Outing";

            return (await connection.QueryAsync<Outing>(sql)).ToList();
        }

        public async Task<Outing?> GetOutingByIdAsync(int outingId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Outing WHERE OutingID = @OutingId;";

            return await connection.QueryFirstOrDefaultAsync<Outing>(sql, new
            {
                OutingId = outingId
            });
        }

        public async Task<List<Outing>?> GetOutingsByDateAsync(DateTime date)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Outing WHERE OutingDate = @OutingDate;";

            return (await connection.QueryAsync<Outing>(sql, new
            {
                OutingDate = date
            })).ToList();
        }

        public async Task<List<Outing>?> GetOutingsByLocationAsync(int locationId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "SELECT * FROM Outing WHERE LocationID = @LocationId;";
            //return (await connection.QueryAsync<Outing>(sql)).ToList()
            return (await connection.QueryAsync<Outing>(sql, new
            {
                LocationId = locationId
            })).ToList();
        }

        public async Task<int> InsertOutingAsync(Outing outing)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = "INSERT INTO Outing (LocationId, OutingDate, StartTime, EndTime)" +
                "VALUES (@LocationId, @OutingDate, @StartTime, @EndTime)";

            return await connection.ExecuteAsync(sql, outing);
        }

        public async Task<int> UpdateOutingByIdAsync(Outing outing, int outingId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = @"UPDATE Outing  
                       SET LocationId = @LocationId,
                           OutingDate = @OutingDate,
                           StartTime = @StartTime,
                           EndTime = @EndTime,
                           UpdatedAt = @UpdatedAt
                       WHERE OutingID = @OutingId";

            return await connection.ExecuteAsync(sql, new
            {
                outing.LocationId,
                outing.OutingDate,
                outing.StartTime,
                outing.EndTime,
                UpdatedAt = DateTime.UtcNow,
                OutingId = outingId
            });
        }
    }
}
