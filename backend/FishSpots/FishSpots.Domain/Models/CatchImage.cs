using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishSpots.Domain.Models
{
    public class CatchImage
    {
        public int ImageId { get; }
        public int CatchId { get; set; }
        public string StoragePath { get; set; }
    }
}
