import express from 'express';
import { createUser, getUserById } from '../controller/user-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { userSchema } from '../validator/schema.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.post('/users', validate(userSchema), asyncHandler(createUser));
router.get('/users/:id', asyncHandler(getUserById));

export default router;
