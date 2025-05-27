using System.Runtime.InteropServices;
using FishSpots.Domain.Exceptions;
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

        public async Task<Location> GetLocationByIdAsync(int locationId)
        {
            var location = await locationRepository.GetLocationByIdAsync(locationId);
            return location == null ? 
                throw new Exception($"Error: location with id {locationId} not found") : location;
        }

        public async Task<int> InsertLocationAsync(Location location)
        {
            return await locationRepository.InsertLocationAsync(location);
        }

        public async Task DeleteLocationByIdAsync(int locationId)
        {
            int success = await locationRepository.DeleteLocationByIdAsync(locationId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Location with id {locationId} not found");
            }
        }

        public async Task UpdateLocationByIdAsync(Location location, int locationId)
        {
            int success = await locationRepository.UpdateLocationByIdAsync(location, locationId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Location with id {locationId} not found");
            }
        }
    }
}
