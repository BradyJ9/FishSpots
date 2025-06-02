using FishSpots.Domain.Models;

namespace FishSpots.Logic.OutingLogic
{
    public interface IOutingLogic
    {
        Task DeleteOutingByIdAsync(int outingId);
        Task<List<Outing>> GetAllOutingsAsync();
        Task<List<Outing>> GetOutingsByLocationAsync(int locationId);
        Task<List<Outing>> GetOutingsByDateAsync(DateTime date);
        Task<Outing?> GetOutingByIdAsync(int outingId);
        Task UpdateOutingByIdAsync(Outing outing, int outingId);
        Task<int> InsertOutingAsync(Outing outing);
    }
}
