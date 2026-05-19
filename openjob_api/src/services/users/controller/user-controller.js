import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import cache from '../../../cache/redis-service.js';
import CacheKeys from '../../../cache/keys.js';
import UserRepositories from '../repositories/user-repositories.js';

const userRepositories = new UserRepositories();

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.validated;
  const result = await userRepositories.createUser({ name, email, password, role });
  return response(res, 201, 'User berhasil ditambahkan', { id: result.id });
};

export const getUserById = async (req, res, next) => {
  const key = CacheKeys.user(req.params.id);
  const cached = await cache.get(key);
  if (cached) {
    res.setHeader('X-Data-Source', 'cache');
    return response(res, 200, 'User berhasil ditampilkan', cached);
  }
  const result = await userRepositories.getUserById(req.params.id);
  if (!result) return next(new NotFoundError('User tidak ditemukan'));
  await cache.set(key, result);
  res.setHeader('X-Data-Source', 'database');
  return response(res, 200, 'User berhasil ditampilkan', result);
};

export const updateUser = async (req, res, next) => {
  const result = await userRepositories.updateUser(req.params.id, req.validated);
  if (!result) return next(new NotFoundError('User tidak ditemukan'));
  await cache.delete(CacheKeys.user(req.params.id));
  return response(res, 200, 'User berhasil diperbarui', result);
};
