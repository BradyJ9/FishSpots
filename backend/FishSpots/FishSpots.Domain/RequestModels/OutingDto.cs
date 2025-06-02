namespace FishSpots.Domain.RequestModels
{
    public class OutingDto
    {
        public int LocationId { get; set; }

        public required DateTime OutingDate { get; set; }

        public string Notes { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }
    }
}
