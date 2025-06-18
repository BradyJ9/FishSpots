using FishSpots.Infrastructure;

namespace FishSpots.Repository.Helpers
{
    public static class SqlGetHelper
    {
        // This function differentiates between the TOP and LIMIT operations smoothly
        public static string GetWithLimitsSql(
                DatabaseProviders provider,
                string sql,
                int limit)
        {
            switch (provider)
            {
                case DatabaseProviders.SqlServer:
                    return sql.Insert(7,$"TOP {limit} ");
                    ;

                case DatabaseProviders.Postgresql:
                    return sql + $"LIMIT {limit};";

                default:
                    throw new InvalidOperationException("No matching sql statement for provider: " + provider);
            }
        }
    }
}
