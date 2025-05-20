using System.Runtime.InteropServices;
using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Repository.CatchImageRepository;
using FishSpots.Repository.LocationImageRepository;

namespace FishSpots.Logic.CatchImageLogic
{
    public class CatchImageLogic(ICatchImageRepository catchImageRepository) : ICatchImageLogic
    {
        public async Task DeleteCatchImageByIdAsync(int imageId)
        {
            int success = await catchImageRepository.DeleteCatchImageByIdAsync(imageId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Image with id {imageId} not found");
            }
        }

        public async Task<CatchImage> GetCatchImageByIdAsync(int catchId)
        {
            var catchImage = await catchImageRepository.GetCatchImageByIdAsync(catchId);
            return catchImage == null ?
                throw new Exception($"Error: no image found for catch with id {catchId}") : catchImage;
        }

        public async Task InsertCatchImageAsync(CatchImage catchImage)
        {
            int success = await catchImageRepository.InsertCatchImageAsync(catchImage);

            if (success != 1)
            {
                throw new Exception("Error: row not inserted");
            }
        }

        public async Task UpdateCatchImageByIdAsync(CatchImage catchImage, int imageId)
        {
            int success = await catchImageRepository.UpdateCatchImageByIdAsync(catchImage, imageId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Image with id {imageId} not found");
            }
        }
    }
}
