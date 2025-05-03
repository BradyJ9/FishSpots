using FishSpots.Domain.Models;

namespace FishSpots.Repository.LocationRepository
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllLocationsAsync();
    }
}
