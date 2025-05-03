using FishSpots.Domain.Models;

namespace FishSpots.Logic.LocationLogic
{
    public interface ILocationLogic
    {
        Task<List<Location>> GetAllLocationsAsync();
    }
}
