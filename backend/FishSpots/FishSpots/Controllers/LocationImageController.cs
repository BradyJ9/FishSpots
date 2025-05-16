using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Logic.LocationImageLogic;
using Microsoft.AspNetCore.Mvc;

namespace FishSpots.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationImageController(ILocationImageLogic locationImageLogic, ILogger<LocationImageController> logger): ControllerBase
    {
        [HttpGet("{locationId}", Name = "GetLocationImageById")]
        public async Task<IActionResult> GetLocationImageById(int locationId)
        {
            try
            {
                LocationImage locationImage = await locationImageLogic.GetLocationImageByIdAsync(locationId);

                return Ok(new
                {
                    locationImage
                });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetLocationImageById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetLocationImageById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost(Name = "LocationImage")]
        public async Task<IActionResult> InsertLocationImage(LocationImage locationImage)
        {
            try
            {
                await locationImageLogic.InsertLocationImageAsync(locationImage);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in InsertLocationImage: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut(Name = "LocationImage/{imageId}")]
        public async Task<IActionResult> UpdateLocationImageById(LocationImage locationImage, int imageId)
        {
            try
            {
                await locationImageLogic.UpdateLocationImageByIdAsync(locationImage, imageId);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in UpdateLocationImageById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete(Name = "LocationImage/{imageId}")]
        public async Task<IActionResult> DeleteLocationImageById(int imageId)
        {
            try
            {
                await locationImageLogic.DeleteLocationImageByIdAsync(imageId);
                return Ok();
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in DeleteLocationImageById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in DeleteLocationImageById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
