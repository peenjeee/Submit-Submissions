import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import UserRepositories from '../repositories/user-repositories.js';

const userRepositories = new UserRepositories();

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.validated;
  const result = await userRepositories.createUser({ name, email, password, role });
  return response(res, 201, 'User berhasil ditambahkan', { id: result.id });
};

export const getUserById = async (req, res, next) => {
  const result = await userRepositories.getUserById(req.params.id);
  if (!result) return next(new NotFoundError('User tidak ditemukan'));
  return response(res, 200, 'User berhasil ditampilkan', result);
};
