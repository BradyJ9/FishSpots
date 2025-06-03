using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Repository.OutingRepository;

namespace FishSpots.Logic.OutingLogic
{
    public class OutingLogic(IOutingRepository outingRepository) : IOutingLogic
    {
        public async Task DeleteOutingByIdAsync(int outingId)
        {
            var success = await outingRepository.DeleteOutingByIdAsync(outingId);

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
            return outing ?? throw new Exception($"Error: outing with id {outingId} not found");
        }

        public async Task<List<Outing>> GetOutingsByDateAsync(DateTime date)
        {
            var outings = await outingRepository.GetOutingsByDateAsync(date);
            return outings ?? throw new Exception($"Error: No outings found for date {date}");
        }

        public async Task<List<Outing>> GetOutingsByLocationAsync(int locationId)
        {
            var outings = await outingRepository.GetOutingsByLocationAsync(locationId);
            return outings ?? throw new Exception($"Error: No outings found for location with id {locationId}");
        }

        public async Task<int> InsertOutingAsync(Outing outing)
        {
            return await outingRepository.InsertOutingAsync(outing);
        }

        public async Task UpdateOutingByIdAsync(Outing outing, int outingId)
        {
            var success = await outingRepository.UpdateOutingByIdAsync(outing, outingId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Outing with id {outingId} not found");
            }
        }
    }
}
