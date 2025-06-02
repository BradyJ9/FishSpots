using System.Data;
using FishSpots.Domain.Models;

namespace FishSpots.Repository.OutingRepository
{
    public interface IOutingRepository
    {
        Task<int> DeleteOutingByIdAsync(int outingId);
        Task<List<Outing>> GetAllOutingsAsync();
        Task<List<Outing>?> GetOutingsByLocationAsync(int locationId);
        Task<List<Outing>?> GetOutingsByDateAsync(DateTime date);
        Task<Outing?> GetOutingByIdAsync(int outingId);
        Task<int> UpdateOutingByIdAsync(Outing outing, int outingId);
        Task<int> InsertOutingAsync(Outing outing);
        Task<int> InsertOutingAsync(IDbConnection connection, Outing outing);
    }
}
