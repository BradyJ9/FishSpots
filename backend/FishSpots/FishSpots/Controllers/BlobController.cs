using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Sas;
using FishSpots.Logic.BlobLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FishSpots.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlobController(IBlobLogic blobLogic, IConfiguration config) : ControllerBase
    {
        [HttpGet(Name = "Blob/SAS")]
        public async Task<IActionResult> GetSasString(string containerName, string blobName)
        {
            try
            {
                var azureConnectionString = blobLogic.GetBlobConfigValue("AzureBlob:AzureConnectionString");
                var blobServiceClient = new BlobServiceClient(azureConnectionString);

                var properties = await blobServiceClient.GetPropertiesAsync();
                properties.Value.Cors =
                    [
                        new BlobCorsRule
                        {
                            MaxAgeInSeconds = 1000,
                            AllowedHeaders = "*",
                            AllowedMethods = "GET, PUT, POST, DELETE, OPTIONS",
                            AllowedOrigins = "*",
                            ExposedHeaders = "*"
                        }
                    ];
                await blobServiceClient.SetPropertiesAsync(properties);

                var sasBuilder = new BlobSasBuilder
                {
                    BlobContainerName = containerName,
                    BlobName = blobName,
                    Resource = "b",
                    ExpiresOn = DateTimeOffset.UtcNow.AddMinutes(5),
                };

                sasBuilder.SetPermissions(BlobContainerSasPermissions.Read | BlobContainerSasPermissions.Write | BlobContainerSasPermissions.Create);

                var accountName = config["AzureBlob:AccountName"];
                var accountKey = blobLogic.GetBlobConfigValue("AzureBlob:AccountKey");
                var blobEndpoint = config["AzureBlob:BlobEndpoint"];

                var credential = new StorageSharedKeyCredential(accountName, accountKey);
                var blobUri = new Uri($"{blobEndpoint}/{accountName}/{containerName}/{blobName}");

                var sasToken = sasBuilder.ToSasQueryParameters(credential).ToString();
                var fullUri = $"{blobUri}?{sasToken}";

                return Ok(new { sasUrl = fullUri });
            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
