using FishSpots.Domain.Models;

namespace FishSpots.Repository.LocationImageRepository
{
    public interface ILocationImageRepository
    {
        Task<LocationImage?> GetLocationImageByIdAsync(int locationId);
        Task<int> DeleteLocationImageByIdAsync(int imageId);
        Task<int> InsertLocationImageAsync(LocationImage locationImage);
        Task<int> UpdateLocationImageByIdAsync(LocationImage locationImage, int imageId);
    }
}
