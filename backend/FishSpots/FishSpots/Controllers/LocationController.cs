using FishSpots.Logic.LocationLogic;
using Microsoft.AspNetCore.Mvc;

namespace FishSpots.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationController(ILocationLogic locationLogic, ILogger<LocationController> logger) : ControllerBase
    {

        [HttpGet(Name = "Locations")]
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
                return StatusCode(500);
            }
        }
    }
}
