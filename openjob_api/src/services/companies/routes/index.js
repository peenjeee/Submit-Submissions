import express from 'express';
import {
  createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany,
} from '../controller/company-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { companyCreateSchema, companyUpdateSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.get('/companies', asyncHandler(getCompanies));
router.get('/companies/:id', asyncHandler(getCompanyById));
router.post('/companies', authenticateToken, validate(companyCreateSchema), asyncHandler(createCompany));
router.put('/companies/:id', authenticateToken, validate(companyUpdateSchema), asyncHandler(updateCompany));
router.delete('/companies/:id', authenticateToken, asyncHandler(deleteCompany));

export default router;
