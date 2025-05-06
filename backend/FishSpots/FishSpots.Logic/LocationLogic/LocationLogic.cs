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
            throw new NotImplementedException();
        }

        public async Task InsertLocationAsync(Location location)
        {
            int success = await locationRepository.InsertLocationAsync(location);

            if (success != 1)
            {
                throw new Exception("Error: row not inserted");
            }
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
