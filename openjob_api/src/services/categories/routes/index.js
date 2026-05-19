import express from 'express';
import {
  createCategory, getCategories, getCategoryById, updateCategory, deleteCategory,
} from '../controller/category-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { categorySchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.get('/categories', asyncHandler(getCategories));
router.get('/categories/:id', asyncHandler(getCategoryById));
router.post('/categories', authenticateToken, validate(categorySchema), asyncHandler(createCategory));
router.put('/categories/:id', authenticateToken, validate(categorySchema), asyncHandler(updateCategory));
router.delete('/categories/:id', authenticateToken, asyncHandler(deleteCategory));

export default router;
