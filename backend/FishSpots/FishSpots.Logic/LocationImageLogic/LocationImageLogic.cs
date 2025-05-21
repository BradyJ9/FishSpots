using System.Runtime.InteropServices;
using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Repository.LocationImageRepository;

namespace FishSpots.Logic.LocationImageLogic
{
    public class LocationImageLogic(ILocationImageRepository locationImageRepository) : ILocationImageLogic
    {
        public async Task DeleteLocationImageByIdAsync(int imageId)
        {
            int success = await locationImageRepository.DeleteLocationImageByIdAsync(imageId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Image with id {imageId} not found");
            }
        }

        public async Task<List<LocationImage>> GetLocationImagesByIdAsync(int locationId)
        {
            return await locationImageRepository.GetLocationImagesByIdAsync(locationId);
        }

        public async Task InsertLocationImageAsync(LocationImage locationImage)
        {
            int success = await locationImageRepository.InsertLocationImageAsync(locationImage);

            if (success != 1)
            {
                throw new Exception("Error: row not inserted");
            }
        }

        public async Task UpdateLocationImageByIdAsync(LocationImage locationImage, int imageId)
        {
            int success = await locationImageRepository.UpdateLocationImageByIdAsync(locationImage,imageId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Image with id {imageId} not found");
            }
        }
    }
}
