namespace FishSpots.Domain.Models
{
    public class Catch
    {
		public int CatchId { get; }

		public int OutingId { get; set; }

		public required string Species { get; set; }

		public float CatchLength { get; set; }

		public float CatchWeight {  get; set; }

		public int Likes { get; set; }

		public string? ImageUrl { get; set; }

		public DateTime CreatedAt { get; set; }

		public DateTime LastUpdatedAt { get; set; }
    }
}
