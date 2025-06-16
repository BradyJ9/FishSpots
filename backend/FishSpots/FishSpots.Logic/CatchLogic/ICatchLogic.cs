using FishSpots.Domain.Models;

namespace FishSpots.Logic.CatchLogic
{
    public interface ICatchLogic
    {
        Task DeleteCatchByIdAsync(int catchId);
        Task<List<Catch>> GetAllCatchesAsync(bool withImagesOnly);
        Task<List<Catch>> GetCatchesByOutingAsync(int outingId);
        Task<List<Catch>> GetCatchesBySpeciesAsync(string species);
        Task<Catch?> GetCatchByIdAsync(int catchId);
        Task<Location?> GetCatchLocationAsync(int catchId);
        Task UpdateCatchByIdAsync(Catch cat, int catchId);
        Task<int> InsertCatchAsync(Catch cat);
    }
}
