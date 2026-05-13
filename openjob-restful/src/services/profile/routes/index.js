import express from 'express';
import { getProfile, getProfileApplications, getProfileBookmarks } from '../controller/profile-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.get('/profile', authenticateToken, asyncHandler(getProfile));
router.get('/profile/applications', authenticateToken, asyncHandler(getProfileApplications));
router.get('/profile/bookmarks', authenticateToken, asyncHandler(getProfileBookmarks));

export default router;
