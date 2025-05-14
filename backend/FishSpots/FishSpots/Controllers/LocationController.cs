using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Logic.LocationLogic;
using Microsoft.AspNetCore.Mvc;

namespace FishSpots.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController(ILocationLogic locationLogic, ILogger<LocationController> logger) : ControllerBase
    {

        [HttpGet(Name = "Location")]
        public async Task<IActionResult> GetAllLocations()
        {
            try
            {
                var locations = await locationLogic.GetAllLocationsAsync();

                return Ok(new {
                    locations
                });
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetAllLocations: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{locationId}",Name = "GetLocationById")]
        public async Task<IActionResult> GetLocationById(int locationId)
        {
            try
            {
                Location location = await locationLogic.GetLocationByIdAsync(locationId);

                return Ok(new
                {
                    location
                });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetLocationById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetLocationsById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost(Name = "Location")]
        public async Task<IActionResult> InsertLocation(Location location)
        {
            try
            {
                await locationLogic.InsertLocationAsync(location);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in InsertLocation: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut(Name = "Location/{locationId}")]
        public async Task<IActionResult> UpdateLocationById(Location location, int locationId)
        {
            try
            {
                await locationLogic.UpdateLocationByIdAsync(location, locationId);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in UpdateLocationById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete(Name = "Location/{locationId}")]
        public async Task<IActionResult> DeleteLocationById(int locationId)
        {
            try
            {
                await locationLogic.DeleteLocationByIdAsync(locationId);
                return Ok();
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in DeleteLocationById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in DeleteLocationById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
