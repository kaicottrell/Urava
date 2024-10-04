using MongoDB.Driver;
using MongoDB.Bson;
using Urava.Server.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Urava.Server.Documents;
using MongoDbGenericRepository.Attributes;
namespace Urava.Server.Repository
{
    public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : Document
    {
        protected readonly IMongoContext Context;
        protected IMongoCollection<TEntity> DbSet;

        public GenericRepository(IMongoContext context)
        {
            Context = context;

            var collectionName = GetCollectionName(typeof(TEntity));
            DbSet = Context.GetCollection<TEntity>(collectionName);
        }

        private string GetCollectionName(Type documentType)
        {
            var attribute = (CollectionNameAttribute)documentType
                .GetCustomAttributes(typeof(CollectionNameAttribute), true)
                .FirstOrDefault();

            return attribute?.Name ?? documentType.Name;
        }


        public virtual void Add(TEntity obj)
        {
            Context.AddCommand(() => DbSet.InsertOneAsync(obj));
        }

        public virtual async Task<TEntity> GetById(ObjectId id)
        {
            var data = await DbSet.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.SingleOrDefault();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            var all = await DbSet.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public virtual void Update(TEntity obj)
        {
            Context.AddCommand(() => DbSet.ReplaceOneAsync(Builders<TEntity>.Filter.Eq("_id", obj._id), obj));
        }

        public virtual void Remove(ObjectId id)
        {
            Context.AddCommand(() => DbSet.DeleteOneAsync(Builders<TEntity>.Filter.Eq("_id", id)));
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
        public void SaveChanges()
        {
            Context.SaveChanges();
        }
    }
}
