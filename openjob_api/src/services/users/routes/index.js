import express from 'express';
import { createUser, getUserById, updateUser } from '../controller/user-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { userSchema, userUpdateSchema } from '../validator/schema.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.post('/users', validate(userSchema), asyncHandler(createUser));
router.get('/users/:id', asyncHandler(getUserById));
router.put('/users/:id', validate(userUpdateSchema), asyncHandler(updateUser));

export default router;
