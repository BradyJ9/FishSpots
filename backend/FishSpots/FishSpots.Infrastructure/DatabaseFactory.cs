using System.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Npgsql;


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
            }

            throw new InvalidOperationException("Error identifying dev environment");
            //TODO: Add in Azure SQL Server conn string and use here
            //var connString = _configuration.GetConnectionString("AzureServerSqlConnection");
            //return new SqlConnection();
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
