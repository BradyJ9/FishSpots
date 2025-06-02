using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FishSpots.Domain.Models
{
    public class Outing
    {
        public int OutingId { get;  }

        public int LocationId { get; set;  }

        public required DateTime OutingDate { get; set; }

        public string? Notes { get; set; }

        public TimeSpan? StartTime { get; set; }

        public TimeSpan? EndTime { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}
