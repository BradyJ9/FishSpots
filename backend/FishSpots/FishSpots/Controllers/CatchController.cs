using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Logic.CatchLogic;
using Microsoft.AspNetCore.Mvc;

namespace FishSpots.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatchController(ICatchLogic catchLogic, ILogger<CatchController> logger) : ControllerBase
    {
        [HttpGet(Name = "Catch")]
        public async Task<IActionResult> GetAllCatches()
        {
            try
            {
                var catches = await catchLogic.GetAllCatchesAsync();
                return Ok(new { catches });
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetAllCatches: {msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{catchId}", Name = "GetCatchById")]
        public async Task<IActionResult> GetCatchById(int catchId)
        {
            try
            {
                var catchItem = await catchLogic.GetCatchByIdAsync(catchId);
                return Ok(new { catchItem });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetCatchById: {msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetCatchById: {msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost(Name = "Catch")]
        public async Task<IActionResult> InsertCatch(Catch cat)
        {
            try
            {
                await catchLogic.InsertCatchAsync(cat);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in InsertCatch: {msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{catchId}", Name = "UpdateCatchById")]
        public async Task<IActionResult> UpdateCatchById(Catch cat, int catchId)
        {
            try
            {
                await catchLogic.UpdateCatchByIdAsync(cat, catchId);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in UpdateCatchById: {msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{catchId}", Name = "DeleteCatchById")]
        public async Task<IActionResult> DeleteCatchById(int catchId)
        {
            try
            {
                await catchLogic.DeleteCatchByIdAsync(catchId);
                return Ok();
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in DeleteCatchById: {msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in DeleteCatchById: {msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Outing/{outingId}", Name = "GetCatchesByOuting")]
        public async Task<IActionResult> GetCatchesByOuting(int outingId)
        {
            try
            {
                var catches = await catchLogic.GetCatchesByOutingAsync(outingId);
                return Ok(new { catches });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetCatchesByOuting: {msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetCatchesByOuting: {msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Species/{species}", Name = "GetCatchesBySpecies")]
        public async Task<IActionResult> GetCatchesBySpecies(string species)
        {
            try
            {
                var catches = await catchLogic.GetCatchesBySpeciesAsync(species);
                return Ok(new { catches });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetCatchesBySpecies: {msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetCatchesBySpecies: {msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
