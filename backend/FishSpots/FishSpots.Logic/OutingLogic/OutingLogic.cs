using System.Runtime.InteropServices;
using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Repository.OutingRepository;

namespace FishSpots.Logic.OutingLogic
{
    public class OutingLogic(IOutingRepository outingRepository) : IOutingLogic
    {
        public async Task DeleteOutingByIdAsync(int outingId)
        {
            int success = await outingRepository.DeleteOutingByIdAsync(outingId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Outing with id {outingId} not found");
            }
        }

        public async Task<List<Outing>> GetAllOutingsAsync()
        {
            return await outingRepository.GetAllOutingsAsync();
        }

        public async Task<Outing?> GetOutingByIdAsync(int outingId)
        {
            var outing = await outingRepository.GetOutingByIdAsync(outingId);
            return outing == null ?
                throw new Exception($"Error: outing with id {outingId} not found") : outing;
        }

        public async Task<List<Outing>> GetOutingsByDateAsync(DateTime date)
        {
            var outings = await outingRepository.GetOutingsByDateAsync(date);
            return outings == null ?
                throw new Exception($"Error: No outings found for date {date}") : outings;
        }

        public async Task<List<Outing>> GetOutingsByLocationAsync(int locationId)
        {
            var outings = await outingRepository.GetOutingsByLocationAsync(locationId);
            return outings == null ?
                throw new Exception($"Error: No outings found for location with id {locationId}") : outings;
        }

        public async Task InsertOutingAsync(Outing outing)
        {
            int success = await outingRepository.InsertOutingAsync(outing);

            if (success != 1)
            {
                throw new Exception("Error: row not inserted");
            }
        }

        public async Task UpdateOutingByIdAsync(Outing outing, int outingId)
        {
            int success = await outingRepository.UpdateOutingByIdAsync(outing, outingId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Outing with id {outingId} not found");
            }
        }
    }
}
