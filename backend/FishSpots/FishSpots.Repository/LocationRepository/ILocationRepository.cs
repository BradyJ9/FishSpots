using FishSpots.Domain.Models;

namespace FishSpots.Repository.LocationRepository
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllLocationsAsync();
        Task<Location> GetLocationByIdAsync(int locationId);
        Task<int> InsertLocationAsync(Location location);
    }
}
