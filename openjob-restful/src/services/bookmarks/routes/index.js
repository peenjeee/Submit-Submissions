import express from 'express';
import {
  createBookmark, getBookmarks, getBookmarkById, deleteBookmark,
} from '../controller/bookmark-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();

router.post('/jobs/:jobId/bookmark', authenticateToken, asyncHandler(createBookmark));
router.get('/jobs/:jobId/bookmark/:id', authenticateToken, asyncHandler(getBookmarkById));
router.delete('/jobs/:jobId/bookmark', authenticateToken, asyncHandler(deleteBookmark));
router.get('/bookmarks', authenticateToken, asyncHandler(getBookmarks));

export default router;
