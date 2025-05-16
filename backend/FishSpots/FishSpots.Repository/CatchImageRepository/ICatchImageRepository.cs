using FishSpots.Domain.Models;

namespace FishSpots.Repository.CatchImageRepository
{
    public interface ICatchImageRepository
    {
        Task<CatchImage?> GetCatchImageByIdAsync(int catchId);
        Task<int> DeleteCatchImageByIdAsync(int imageId);
        Task<int> InsertCatchImageAsync(CatchImage catchImage);
        Task<int> UpdateCatchImageByIdAsync(CatchImage catchImage, int imageId);
    }
}
