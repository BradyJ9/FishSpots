using System.Runtime.InteropServices;
using FishSpots.Domain.Exceptions;
using FishSpots.Domain.Models;
using FishSpots.Repository.CatchRepository;

namespace FishSpots.Logic.CatchLogic
{
    public class CatchLogic(ICatchRepository catchRepository) : ICatchLogic
    {
        public async Task DeleteCatchByIdAsync(int catchId)
        {
            int success = await catchRepository.DeleteCatchByIdAsync(catchId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Error: Catch with id {catchId} not found");
            }
        }

        public async Task<List<Catch>> GetAllCatchesAsync()
        {
            return await catchRepository.GetAllCatchesAsync();
        }

        public async Task<Catch?> GetCatchByIdAsync(int catchId)
        {
            var cat = await catchRepository.GetCatchByIdAsync(catchId);
            return cat == null ?
                throw new Exception($"Error: catch with id {catchId} not found") : cat;
        }

        public async Task<List<Catch>> GetCatchesByOutingAsync(int outingId)
        {
            var catches = await catchRepository.GetCatchesByOutingAsync(outingId);
            return catches == null ?
                throw new Exception($"Error: No catches found for outing with id {outingId}") : catches;
        }

        public async Task<List<Catch>> GetCatchesBySpeciesAsync(string species)
        {
            var catches = await catchRepository.GetCatchesBySpeciesAsync(species);
            return catches == null ?
                throw new Exception($"Error: No catches found of species {species}") : catches;
        }
        public async Task<Location?> GetCatchLocationAsync(int catchId)
        {
            var cat = await catchRepository.GetCatchLocationAsync(catchId);
            return cat == null ?
                throw new Exception($"Error: location for catch {catchId} not found") : cat;
        }

        public async Task InsertCatchAsync(Catch cat)
        {
            int success = await catchRepository.InsertCatchAsync(cat);

            if (success != 1)
            {
                throw new Exception("Error: row not inserted");
            }
        }

        public async Task UpdateCatchByIdAsync(Catch cat, int catchId)
        {
            int success = await catchRepository.UpdateCatchByIdAsync(cat, catchId);

            if (success != 1)
            {
                throw new ResourceNotFoundException($"Catch with id {catchId} not found");
            }
        }
    }
}
