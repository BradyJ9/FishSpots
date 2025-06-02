namespace FishSpots.Domain.Models
{
    public class Location
    {
        public int LocationId { get; }
        
        public required string LocationName { get; set; }

        public string? LocationDescription { get; set; }

        public required string Lat { get; set; }

        public required string Long { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
