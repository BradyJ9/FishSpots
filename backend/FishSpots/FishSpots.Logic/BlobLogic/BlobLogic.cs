using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace FishSpots.Logic.BlobLogic
{
    public class BlobLogic(IHostEnvironment env, IConfiguration config) : IBlobLogic
    {
        public string? GetBlobConfigValue(string configName)
        {
            if (env.IsProduction())
            {
                var keyStorageKey = config[configName];
                return !string.IsNullOrEmpty(keyStorageKey) ? config[keyStorageKey] : null;
            }
            return config[configName];
        }
    }
}
