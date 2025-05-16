using FishSpots.Domain.Models;

namespace FishSpots.Logic.LocationImageLogic
{
    public interface ILocationImageLogic
    {
        Task<LocationImage> GetLocationImageByIdAsync(int locationId);
        Task DeleteLocationImageByIdAsync(int imageId);
        Task InsertLocationImageAsync(LocationImage locationImage);
        Task UpdateLocationImageByIdAsync(LocationImage locationImage, int imageId);
    }
}
