import express from 'express';
import {
  createJob, getJobs, getJobById, getJobsByCompany, getJobsByCategory, updateJob, deleteJob,
} from '../controller/job-controller.js';
import { validate, validateQuery } from '../../../middlewares/validate.js';
import { jobCreateSchema, jobUpdateSchema, jobQuerySchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.get('/jobs', validateQuery(jobQuerySchema), asyncHandler(getJobs));
router.get('/jobs/company/:companyId', asyncHandler(getJobsByCompany));
router.get('/jobs/category/:categoryId', asyncHandler(getJobsByCategory));
router.get('/jobs/:id', asyncHandler(getJobById));
router.post('/jobs', authenticateToken, validate(jobCreateSchema), asyncHandler(createJob));
router.put('/jobs/:id', authenticateToken, validate(jobUpdateSchema), asyncHandler(updateJob));
router.delete('/jobs/:id', authenticateToken, asyncHandler(deleteJob));

export default router;
