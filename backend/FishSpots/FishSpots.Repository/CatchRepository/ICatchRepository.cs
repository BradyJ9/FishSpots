using System.Data;
using FishSpots.Domain.Models;

namespace FishSpots.Repository.CatchRepository
{
    public interface ICatchRepository
    {
        Task<int> DeleteCatchByIdAsync(int catchId);
        Task<List<Catch>> GetAllCatchesAsync();
        Task<List<Catch>?> GetCatchesByOutingAsync(int outingId);
        Task<List<Catch>?> GetCatchesBySpeciesAsync(string species);
        Task<Catch?> GetCatchByIdAsync(int catchId);
        Task<Location?> GetCatchLocationAsync(int outingId);
        Task<int> UpdateCatchByIdAsync(Catch cat, int catchId);
        Task<int> InsertCatchAsync(Catch cat);
        Task<int> InsertCatchesIntoOutingAsync(List<Catch> catches, int outingId);
        Task<int> InsertCatchesIntoOutingAsync(IDbConnection connection, List<Catch> catches, int outingId);
    }
}
