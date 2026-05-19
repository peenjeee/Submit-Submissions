import TokenManager from '../security/token-manager.js';
import response from '../utils/response.js';

const authenticateToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response(res, 401, 'Unauthorized');
  }

  try {
    req.user = TokenManager.verifyAccessToken(authorization.replace('Bearer ', ''));
    return next();
  } catch (error) {
    return response(res, 401, error.message);
  }
};

export default authenticateToken;
