using System;
using System.Threading.Tasks;

namespace Urava.Server.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        Task<bool> Commit();
    }
}