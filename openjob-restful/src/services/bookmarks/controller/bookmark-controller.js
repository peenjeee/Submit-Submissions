import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import BookmarkRepositories from '../repositories/bookmark-repositories.js';

const bookmarkRepositories = new BookmarkRepositories();

export const createBookmark = async (req, res) => {
  const result = await bookmarkRepositories.createBookmark({ userId: req.user.id, jobId: req.params.jobId });
  return response(res, 201, 'Bookmark berhasil ditambahkan', { id: result.id });
};

export const getBookmarks = async (req, res) => {
  const bookmarks = await bookmarkRepositories.getBookmarksByUser(req.user.id);
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
  return response(res, 200, 'Bookmark berhasil dihapus', { id: result.id });
};
