using System.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Microsoft.Data.SqlClient;


namespace FishSpots.Infrastructure
{
    public class DatabaseFactory(IHostEnvironment env, IConfiguration config)
    {
        private readonly IHostEnvironment _hostEnvironment = env;
        private readonly IConfiguration _configuration = config;

        public IDbConnection CreateDbConnection()
        {
            if (_hostEnvironment.IsDevelopment() || _hostEnvironment.IsEnvironment("Debug"))
            {
                var connString = _configuration.GetConnectionString("PostgresqlConnection");
                var conn = new NpgsqlConnection(connString);
                conn.Open();
                return conn;
            } else if (_hostEnvironment.IsProduction()) // Staging?
            {
                var connString = _configuration.GetConnectionString("AzureServerSqlConnection");
                var conn = new SqlConnection(connString);
                conn.Open();
                return conn;
            }

            throw new InvalidOperationException("Error identifying dev environment");
        }

        public DatabaseProviders GetDbProvider()
        {
            if (_hostEnvironment.IsDevelopment() || _hostEnvironment.IsEnvironment("Debug"))
            {
                return DatabaseProviders.Postgresql;
            }

            if (_hostEnvironment.IsProduction())
            {
                return DatabaseProviders.SqlServer;
            }

            throw new InvalidOperationException("No Db Provider found");
        }
    }
}
