using FishSpots.Domain.Models;

namespace FishSpots.Logic.LocationLogic
{
    public interface ILocationLogic
    {
        Task<List<Location>> GetAllLocationsAsync();
        Task InsertLocationAsync(Location location);
        Task UpdateLocationByIdAsync(Location location, int locationId); 
        Task<Location> GetLocationByIdAsync(int locationId);
        Task DeleteLocationByIdAsync(int locationId);
    }
}
