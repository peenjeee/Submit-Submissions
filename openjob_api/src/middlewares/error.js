import { ClientError } from '../exceptions/index.js';
import response from '../utils/response.js';

const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message);
  }

  if (err.isJoi) {
    return response(res, 400, err.details[0].message);
  }

  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') return response(res, 400, 'File is required and maximum size is 5MB');
    return response(res, 400, err.message);
  }

  if (err.code === '23505') {
    return response(res, 400, 'Data sudah digunakan');
  }

  if (err.code === '23503' || err.code === '23514') {
    return response(res, 400, 'Data tidak valid');
  }

  console.error(err);
  return response(res, 500, 'Internal Server Error');
};

export default errorHandler;
