using System.Reflection.PortableExecutable;
using FishSpots.Infrastructure;

namespace FishSpots.Repository.Helpers
{
    /// <summary>
    /// This is a helper class to help specify insert statements across db providers, mainly for
    /// the sake of supporting provider-specific queries and id returning functions
    /// </summary>
    public static class SqlInsertHelper
    {
        public static string GetInsertWithReturnSql(
             DatabaseProviders provider,
             string tableName,
             string columns,
             string values,
             string idColumn)
        {
            switch (provider) {
                case DatabaseProviders.SqlServer:
                    return $"INSERT INTO {tableName} ({columns}) OUTPUT INSERTED.{idColumn} VALUES ({values});";
;

                case DatabaseProviders.Postgresql:
                    return $"INSERT INTO {tableName} ({columns}) VALUES ({values}) RETURNING {idColumn};";
            }

            throw new InvalidOperationException("No matching sql statement for provider: " + provider.ToString());

        }
    }
}
