using FishSpots.Domain.Models;

namespace FishSpots.Repository.LocationRepository
{
    public interface ILocationRepository
    {
        Task<int> DeleteLocationByIdAsync(int locationId);
        Task<List<Location>> GetAllLocationsAsync();
        Task<Location> GetLocationByIdAsync(int locationId);
        Task<int> UpdateLocationByIdAsync(Location location, int locationId)
        Task<int> InsertLocationAsync(Location location);
    }
}
