using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
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
                return new NpgsqlConnection(connString);
            }

            throw new InvalidOperationException("Error identifying dev environment");
            //TODO: Add in Azure SQL Server conn string and use here
            //var connString = _configuration.GetConnectionString("AzureServerSqlConnection");
            //return new SqlConnection();
        }
    }
}
