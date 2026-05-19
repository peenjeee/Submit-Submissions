import ClientError from './client-error.js';

class AuthenticationError extends ClientError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;
