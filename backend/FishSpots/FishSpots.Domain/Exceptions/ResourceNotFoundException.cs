namespace FishSpots.Domain.Exceptions
{
    public class ResourceNotFoundException(string message) : Exception(message)
    {
    }
}
