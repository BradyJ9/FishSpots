using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Logic.OutingLogic;
using Microsoft.AspNetCore.Mvc;

namespace FishSpots.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OutingController(IOutingLogic outingLogic, ILogger<OutingController> logger) : ControllerBase
    {
        [HttpGet(Name = "Outing")]
        public async Task<IActionResult> GetAllOutings()
        {
            try
            {
                var outings = await outingLogic.GetAllOutingsAsync();

                return Ok(new
                {
                    outings
                });
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetAllOutings: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{outingId}", Name = "GetOutingById")]
        public async Task<IActionResult> GetOutingById(int outingId)
        {
            try
            {
                Outing outing = await outingLogic.GetOutingByIdAsync(outingId);

                return Ok(new
                {
                    outing
                });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetOutingById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetOutingById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost(Name = "Outing")]
        public async Task<IActionResult> InsertOuting(Outing outing)
        {
            try
            {
                await outingLogic.InsertOutingAsync(outing);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in InsertOuting: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut(Name = "Outing/{outingId}")]
        public async Task<IActionResult> UpdateOutingById(Outing outing, int outingId)
        {
            try
            {
                await outingLogic.UpdateOutingByIdAsync(outing, outingId);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in UpdateOutingById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete(Name = "Outing/{outingId}")]
        public async Task<IActionResult> DeleteOutingById(int outingId)
        {
            try
            {
                await outingLogic.DeleteOutingByIdAsync(outingId);
                return Ok();
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in DeleteOutingById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in DeleteOutingById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("/date/{date}", Name = "GetOutingsByDate")]
        public async Task<IActionResult> GetOutingsByDate(DateTime date)
        {
            try
            {
                List<Outing> outings = await outingLogic.GetOutingsByDateAsync(date);

                return Ok(new
                {
                    outings
                });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetOutingsByDate: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetOutingsByDate: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("/location/{locationId}", Name = "GetOutingsByLocation")]
        public async Task<IActionResult> GetOutingsByLocation(int locationId)
        {
            try
            {
                List<Outing> outings = await outingLogic.GetOutingsByLocationAsync(locationId);

                return Ok(new
                {
                    outings
                });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetOutingsByLocation: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetOutingsByLocation: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
