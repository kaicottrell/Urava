using Urava.Server.Documents;
using Urava.Server.Interfaces;

namespace Urava.Server.Repository
{
    public class JobApplicationRepository : BaseRepository<JobApplication>
    {
        public JobApplicationRepository(IMongoContext context) : base(context)
        {
        }
    }
}
