using FishSpots.Domain.Models;

namespace FishSpots.Logic.LocationLogic
{
    public interface ILocationLogic
    {
        Task<List<Location>> GetAllLocationsAsync();

        Task InsertLocationAsync(Location location);

        Task<Location> GetLocationByIdAsync(int locationId);
    }
}
