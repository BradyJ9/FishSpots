using System.ComponentModel.DataAnnotations;
using FishSpots.Domain.Models;

namespace FishSpots.Domain.RequestModels
{
    public class OutingInsertRequest
    {
        public required OutingDto Outing { get; set; }

        public List<CatchDto>? Catches { get; set; }
    }
}
