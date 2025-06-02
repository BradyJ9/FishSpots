namespace FishSpots.Domain.RequestModels
{
    public class CatchDto
    {
        public string Species { get; set; }

        public double CatchLength { get; set; }

        public double CatchWeight { get; set; }

        public string? ImageUrl { get; set; }

    }
}
