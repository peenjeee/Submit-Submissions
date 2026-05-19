import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import UserRepositories from '../../users/repositories/user-repositories.js';
import ApplicationRepositories from '../../applications/repositories/application-repositories.js';
import BookmarkRepositories from '../../bookmarks/repositories/bookmark-repositories.js';

const userRepositories = new UserRepositories();
const applicationRepositories = new ApplicationRepositories();
const bookmarkRepositories = new BookmarkRepositories();

export const getProfile = async (req, res, next) => {
  const result = await userRepositories.getUserById(req.user.id);
  if (!result) return next(new NotFoundError('User tidak ditemukan'));
  return response(res, 200, 'Profile berhasil ditampilkan', result);
};

export const getProfileApplications = async (req, res) => {
  const applications = await applicationRepositories.getApplicationsByUser(req.user.id);
  return response(res, 200, 'Applications berhasil ditampilkan', { applications });
};

export const getProfileBookmarks = async (req, res) => {
  const bookmarks = await bookmarkRepositories.getBookmarksByUser(req.user.id);
  return response(res, 200, 'Bookmarks berhasil ditampilkan', { bookmarks });
};
