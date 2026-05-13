import express from 'express';
import { login, refreshToken, logout } from '../controller/authentication-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { loginSchema, refreshTokenSchema } from '../validator/schema.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.post('/authentications', validate(loginSchema), asyncHandler(login));
router.put('/authentications', validate(refreshTokenSchema), asyncHandler(refreshToken));
router.delete('/authentications', validate(refreshTokenSchema), asyncHandler(logout));

export default router;
