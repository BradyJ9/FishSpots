using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Logic.CatchImageLogic;
using Microsoft.AspNetCore.Mvc;

namespace FishSpots.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatchImageController(ICatchImageLogic catchImageLogic, ILogger<CatchImageController> logger): ControllerBase 
    {
        [HttpGet("{catchId}", Name = "GetCatchImageById")]
        public async Task<IActionResult> GetCatchImageById(int catchId)
        {
            try
            {
                CatchImage catchImage = await catchImageLogic.GetCatchImageByIdAsync(catchId);

                return Ok(new
                {
                    catchImage
                });
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in GetCatchImageById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in GetCatchImageById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost(Name = "CatchImage")]
        public async Task<IActionResult> InsertCatchImage(CatchImage catchImage)
        {
            try
            {
                await catchImageLogic.InsertCatchImageAsync(catchImage);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in InsertCatchImage: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut(Name = "CatchImage/{imageId}")]
        public async Task<IActionResult> UpdateCatchImageById(CatchImage catchImage, int imageId)
        {
            try
            {
                await catchImageLogic.UpdateCatchImageByIdAsync(catchImage, imageId);
                return Ok();
            }
            catch (Exception ex)
            {
                logger.LogError("Error in UpdateCatchImageById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete(Name = "CatchImage/{imageId}")]
        public async Task<IActionResult> DeleteCatchImageById(int imageId)
        {
            try
            {
                await catchImageLogic.DeleteCatchImageByIdAsync(imageId);
                return Ok();
            }
            catch (ResourceNotFoundException ex)
            {
                logger.LogError("Error in DeleteCatchImageById: ${msg}", ex.Message);
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                logger.LogError("Error in DeleteCatchImageById: ${msg}", ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
