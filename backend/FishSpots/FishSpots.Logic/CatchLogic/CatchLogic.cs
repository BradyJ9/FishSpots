using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Repository.CatchRepository;

namespace FishSpots.Logic.CatchLogic
{
    public class CatchLogic(ICatchRepository catchRepository) : ICatchLogic
    {
        public async Task DeleteCatchByIdAsync(int catchId)
        {
            var success = await catchRepository.DeleteCatchByIdAsync(catchId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Error: Catch with id {catchId} not found");
            }
        }

        public async Task<List<Catch>> GetAllCatchesAsync(bool withImagesOnly)
        {
            if (withImagesOnly)
            {
                return await catchRepository.GetAllCatchesWithImagesAsync();
            }
            return await catchRepository.GetAllCatchesAsync();
        }

        public async Task<Catch?> GetCatchByIdAsync(int catchId)
        {
            var cat = await catchRepository.GetCatchByIdAsync(catchId);
            return cat ?? throw new Exception($"Error: catch with id {catchId} not found");
        }

        public async Task<List<Catch>> GetCatchesByOutingAsync(int outingId)
        {
            var catches = await catchRepository.GetCatchesByOutingAsync(outingId);
            return catches ?? throw new Exception($"Error: No catches found for outing with id {outingId}");
        }

        public async Task<List<Catch>> GetCatchesBySpeciesAsync(string species)
        {
            var catches = await catchRepository.GetCatchesBySpeciesAsync(species);
            return catches ?? throw new Exception($"Error: No catches found of species {species}");
        }
        public async Task<Location?> GetCatchLocationAsync(int catchId)
        {
            var cat = await catchRepository.GetCatchLocationAsync(catchId);
            return cat ?? throw new Exception($"Error: location for catch {catchId} not found");
        }

        public async Task<int> InsertCatchAsync(Catch cat)
        {
            return await catchRepository.InsertCatchAsync(cat);
        }

        public async Task UpdateCatchByIdAsync(Catch cat, int catchId)
        {
            var success = await catchRepository.UpdateCatchByIdAsync(cat, catchId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Catch with id {catchId} not found");
            }
        }
    }
}
