import bcrypt from 'bcrypt';
import response from '../../../utils/response.js';
import TokenManager from '../../../security/token-manager.js';
import { AuthenticationError, InvariantError } from '../../../exceptions/index.js';
import AuthenticationRepositories from '../repositories/authentication-repositories.js';
import UserRepositories from '../../users/repositories/user-repositories.js';

const authenticationRepositories = new AuthenticationRepositories();
const userRepositories = new UserRepositories();

export const login = async (req, res, next) => {
  const { email, password } = req.validated;
  const user = await userRepositories.getUserByEmail(email);
  if (!user) return next(new AuthenticationError('Kredensial yang Anda berikan salah'));

  const match = await bcrypt.compare(password, user.password);
  if (!match) return next(new AuthenticationError('Kredensial yang Anda berikan salah'));

  const accessToken = TokenManager.generateAccessToken({ id: user.id });
  const refreshToken = TokenManager.generateRefreshToken({ id: user.id });
  await authenticationRepositories.addToken(refreshToken, user.id);

  return response(res, 200, 'Authentication berhasil ditambahkan', { accessToken, refreshToken });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken: token } = req.validated;
  const registered = await authenticationRepositories.verifyToken(token);
  if (!registered) return next(new InvariantError('Refresh token tidak valid'));

  const payload = TokenManager.verifyRefreshToken(token);
  const accessToken = TokenManager.generateAccessToken({ id: payload.id });
  return response(res, 200, 'Access Token berhasil diperbarui', { accessToken });
};

export const logout = async (req, res, next) => {
  const { refreshToken: token } = req.validated;
  const result = await authenticationRepositories.deleteToken(token);
  if (!result) return next(new InvariantError('Refresh token tidak valid'));
  return response(res, 200, 'Refresh token berhasil dihapus');
};
