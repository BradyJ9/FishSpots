using FishSpots.Domain.Models;
using FishSpots.Repository.LocationRepository;

namespace FishSpots.Logic.LocationLogic
{
    public class LocationLogic(ILocationRepository locationRepository) : ILocationLogic
    {
        public async Task<List<Location>> GetAllLocationsAsync()
        {
            return await locationRepository.GetAllLocationsAsync();
        }
    }
}
