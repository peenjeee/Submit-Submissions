import express from 'express';
import {
  createApplication, getApplications, getApplicationById,
  getApplicationsByUser, getApplicationsByJob, updateApplication, deleteApplication,
} from '../controller/application-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { applicationSchema, applicationUpdateSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.post('/applications', authenticateToken, validate(applicationSchema), asyncHandler(createApplication));
router.get('/applications', authenticateToken, asyncHandler(getApplications));
router.get('/applications/user/:userId', authenticateToken, asyncHandler(getApplicationsByUser));
router.get('/applications/job/:jobId', authenticateToken, asyncHandler(getApplicationsByJob));
router.get('/applications/:id', authenticateToken, asyncHandler(getApplicationById));
router.put('/applications/:id', authenticateToken, validate(applicationUpdateSchema), asyncHandler(updateApplication));
router.delete('/applications/:id', authenticateToken, asyncHandler(deleteApplication));

export default router;
