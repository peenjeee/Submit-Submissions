import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import cache from '../../../cache/redis-service.js';
import CacheKeys from '../../../cache/keys.js';
import BookmarkRepositories from '../repositories/bookmark-repositories.js';

const bookmarkRepositories = new BookmarkRepositories();

export const createBookmark = async (req, res) => {
  const result = await bookmarkRepositories.createBookmark({ userId: req.user.id, jobId: req.params.jobId });
  await cache.delete(CacheKeys.bookmarks(req.user.id));
  return response(res, 201, 'Bookmark berhasil ditambahkan', { id: result.id });
};

export const getBookmarks = async (req, res) => {
  const key = CacheKeys.bookmarks(req.user.id);
  const cached = await cache.get(key);
  if (cached) {
    res.setHeader('X-Data-Source', 'cache');
    return response(res, 200, 'Bookmarks berhasil ditampilkan', { bookmarks: cached });
  }
  const bookmarks = await bookmarkRepositories.getBookmarksByUser(req.user.id);
  await cache.set(key, bookmarks);
  res.setHeader('X-Data-Source', 'database');
  return response(res, 200, 'Bookmarks berhasil ditampilkan', { bookmarks });
};

export const getBookmarkById = async (req, res, next) => {
  const result = await bookmarkRepositories.getBookmarkById({
    id: req.params.id,
    jobId: req.params.jobId,
    userId: req.user.id,
  });
  if (!result) return next(new NotFoundError('Bookmark tidak ditemukan'));
  return response(res, 200, 'Bookmark berhasil ditampilkan', result);
};

export const deleteBookmark = async (req, res, next) => {
  const result = await bookmarkRepositories.deleteBookmark({ jobId: req.params.jobId, userId: req.user.id });
  if (!result) return next(new NotFoundError('Bookmark tidak ditemukan'));
  await cache.delete(CacheKeys.bookmarks(req.user.id));
  return response(res, 200, 'Bookmark berhasil dihapus', { id: result.id });
};
