using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LockStateConsumer
{
    public class LockState
    {
        public int Id { get; set; }
        public LockStateEnum State { get; set; }
    }
}
