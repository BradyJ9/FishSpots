namespace FishSpots.Domain.Models
{
    public class CatchImage
    {
        public int ImageId { get; }
        public int CatchId { get; set; }
        public string StoragePath { get; set; }
    }
}
