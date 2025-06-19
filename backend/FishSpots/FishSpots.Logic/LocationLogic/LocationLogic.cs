using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Domain.RequestModels;
using FishSpots.Infrastructure;
using FishSpots.Repository.CatchRepository;
using FishSpots.Repository.LocationRepository;
using FishSpots.Repository.OutingRepository;
using Microsoft.Extensions.Logging;

namespace FishSpots.Logic.LocationLogic
{
    public class LocationLogic(ILocationRepository locationRepository, IOutingRepository outingRepository, ICatchRepository catchRepository, DatabaseFactory databaseFactory, ILogger<LocationLogic> logger) : ILocationLogic
    {
        public async Task<List<Location>> GetAllLocationsAsync()
        {
            return await locationRepository.GetAllLocationsAsync();
        }

        public async Task<Location> GetLocationByIdAsync(int locationId)
        {
            var location = await locationRepository.GetLocationByIdAsync(locationId);
            return location ?? throw new Exception($"Error: location with id {locationId} not found");
        }

        public async Task<int> InsertLocationAsync(Location location)
        {
            return await locationRepository.InsertLocationAsync(location);
        }

        public async Task DeleteLocationByIdAsync(int locationId)
        {
            var success = await locationRepository.DeleteLocationByIdAsync(locationId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Location with id {locationId} not found");
            }
        }

        public async Task UpdateLocationByIdAsync(Location location, int locationId)
        {
            var success = await locationRepository.UpdateLocationByIdAsync(location, locationId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Location with id {locationId} not found");
            }
        }

        public async Task<int> InsertOutingIntoLocationAsync(int locationId, OutingInsertRequest outingInsert)
        {
            using var connection = databaseFactory.CreateDbConnection();
            using var transaction = connection.BeginTransaction();

            try
            {
                var outing = new Outing
                {
                    LocationId = outingInsert.Outing.LocationId,
                    Username = outingInsert.Outing.Username,
                    OutingDate = outingInsert.Outing.OutingDate,
                    Notes = outingInsert.Outing.Notes,
                    StartTime = string.IsNullOrWhiteSpace(outingInsert.Outing.StartTime) ? null : DateTime.Parse(outingInsert.Outing.StartTime).TimeOfDay,
                    EndTime = string.IsNullOrWhiteSpace(outingInsert.Outing.EndTime) ? null : DateTime.Parse(outingInsert.Outing.EndTime).TimeOfDay,
                };
                var outingId = await outingRepository.InsertOutingAsync(connection, outing, transaction);

                var catches = outingInsert.Catches?.Select(catchDto => new Catch
                {
                    Species = catchDto.Species,
                    CatchLength = (float)catchDto.CatchLength,
                    CatchWeight = (float)catchDto.CatchWeight,
                    ImageUrl = catchDto.ImageUrl ?? string.Empty,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }).ToList() ?? [];

                await catchRepository.InsertCatchesIntoOutingAsync(connection, catches, outingId, transaction);

                transaction.Commit();
                return outingId;
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
