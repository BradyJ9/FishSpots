using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishSpots.Domain.Models
{
    public class Location
    {
        public int LocationId { get; }
        
        public string LocationName { get; set; }

        public string Lat { get; set; }

        public string Long { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
