using System.Data;
using Dapper;
using FishSpots.Domain.Models;
using FishSpots.Infrastructure;
using FishSpots.Repository.Helpers;

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

            var sql = "SELECT * FROM Outing WHERE LocationID = @LocationId " +
                           "ORDER BY OutingDate DESC, StartTime DESC;";
            return (await connection.QueryAsync<Outing>(sql, new
            {
                LocationId = locationId
            })).ToList();
        }

        public async Task<int> InsertOutingAsync(Outing outing)
        {
            using var connection = databaseFactory.CreateDbConnection();

            return await InsertOutingAsync(connection, outing);
        }

        public async Task<int> InsertOutingAsync(IDbConnection connection, Outing outing, IDbTransaction transaction = null)
        {
            var sql = SqlInsertHelper.GetInsertWithReturnSql(databaseFactory.GetDbProvider(),
                "Outing",
                "LocationId, Username, OutingDate, Notes, StartTime, EndTime",
                "@LocationId, @Username, @OutingDate, @Notes, @StartTime, @EndTime",
                "OutingId");

            return await connection.QuerySingleAsync<int>(sql, outing, transaction);
        }

        public async Task<int> UpdateOutingByIdAsync(Outing outing, int outingId)
        {
            using var connection = databaseFactory.CreateDbConnection();

            var sql = @"UPDATE Outing  
                       SET LocationId = @LocationId,
                           Username = @Username,
                           Notes = @Notes,
                           OutingDate = @OutingDate,
                           StartTime = @StartTime,
                           EndTime = @EndTime,
                           UpdatedAt = @UpdatedAt
                       WHERE OutingID = @OutingId";

            return await connection.ExecuteAsync(sql, new
            {
                outing.LocationId,
                outing.Username,
                outing.Notes,
                outing.OutingDate,
                outing.StartTime,
                outing.EndTime,
                UpdatedAt = DateTime.UtcNow,
                OutingId = outingId
            });
        }
    }
}
