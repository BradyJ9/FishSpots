using FishSpots.Domain.Models;

namespace FishSpots.Logic.LocationImageLogic
{
    public interface ILocationImageLogic
    {
        Task<List<LocationImage>> GetLocationImagesByIdAsync(int locationId);
        Task DeleteLocationImageByIdAsync(int imageId);
        Task InsertLocationImageAsync(LocationImage locationImage);
        Task UpdateLocationImageByIdAsync(LocationImage locationImage, int imageId);
    }
}
