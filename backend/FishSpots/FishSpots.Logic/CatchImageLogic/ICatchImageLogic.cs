using FishSpots.Domain.Models;

namespace FishSpots.Logic.CatchImageLogic
{
    public interface ICatchImageLogic
    {
        Task<CatchImage> GetCatchImageByIdAsync(int catchId);
        Task DeleteCatchImageByIdAsync(int imageId);
        Task InsertCatchImageAsync(CatchImage catchImage);
        Task UpdateCatchImageByIdAsync(CatchImage catchImage, int imageId);
    }
}
