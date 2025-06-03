using FishSpots.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Dapper;

namespace FishSpots.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthCheckController(DatabaseFactory dbFactory) : ControllerBase
    {

        [HttpGet(Name = "DbHealthCheck")]
        public async Task<IActionResult> HealthCheck()
        {
            try
            {
                var dbConn = dbFactory.CreateDbConnection();

                    string numTablesSql = @"SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';";

                var time = await dbConn.QueryAsync<DateTime>("SELECT NOW();");
                var healthy = await dbConn.QueryAsync<int>("SELECT 1");
                var numberOfTables = await dbConn.QueryAsync<int>(numTablesSql);

                return Ok(new
                {
                    IsHealthy = healthy,
                    Time = time,
                    NumberOfTables = numberOfTables
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error: " + ex.Message);
            }
        }
    }
}
