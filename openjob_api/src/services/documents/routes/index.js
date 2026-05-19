import express from 'express';
import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { InvariantError } from '../../../exceptions/index.js';
import {
  createDocument, getDocuments, getDocumentById, deleteDocument,
} from '../controller/document-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import asyncHandler from '../../../utils/async-handler.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/documents'),
  filename: (_req, file, cb) => cb(null, `${nanoid(16)}${path.extname(file.originalname).toLowerCase() || '.pdf'}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isPdf = file.mimetype === 'application/pdf' && path.extname(file.originalname).toLowerCase() === '.pdf';
    if (isPdf) return cb(null, true);
    return cb(new InvariantError('File is required and must be a PDF'));
  },
});

router.get('/documents', asyncHandler(getDocuments));
router.get('/documents/:id', asyncHandler(getDocumentById));
router.post('/documents', authenticateToken, upload.single('document'), asyncHandler(createDocument));
router.delete('/documents/:id', authenticateToken, asyncHandler(deleteDocument));

export default router;
