const CacheKeys = {
  company: (id) => `companies:${id}`,
  user: (id) => `users:${id}`,
  application: (id) => `applications:${id}`,
  applicationsByUser: (userId) => `applications:user:${userId}`,
  applicationsByJob: (jobId) => `applications:job:${jobId}`,
  bookmarks: (userId) => `bookmarks:${userId}`,
};

export default CacheKeys;
