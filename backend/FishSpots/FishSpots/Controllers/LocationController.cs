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
                logger.LogError("Error in InsertLocation: ${}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
