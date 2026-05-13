import express from 'express';
import multer from 'multer';
import {
  createDocument, getDocuments, getDocumentById, deleteDocument,
} from '../controller/document-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/documents', asyncHandler(getDocuments));
router.get('/documents/:id', asyncHandler(getDocumentById));
router.post('/documents', authenticateToken, upload.single('document'), asyncHandler(createDocument));
router.delete('/documents/:id', authenticateToken, asyncHandler(deleteDocument));

export default router;
