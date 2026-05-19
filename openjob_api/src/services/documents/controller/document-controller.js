import fs from 'fs/promises';
import path from 'path';
import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import DocumentRepositories from '../repositories/document-repositories.js';

const documentRepositories = new DocumentRepositories();

export const createDocument = async (req, res, next) => {
  if (!req.file) return next(new InvariantError('File is required'));
  const result = await documentRepositories.createDocument({
    userId: req.user.id,
    originalName: req.file.originalname,
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    filePath: req.file.path,
    size: req.file.size,
  });
  return response(res, 201, 'Document berhasil ditambahkan', {
    documentId: result.id,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
  });
};

export const getDocuments = async (req, res) => {
  const documents = await documentRepositories.getDocuments();
  return response(res, 200, 'Documents berhasil ditampilkan', { documents });
};

export const getDocumentById = async (req, res, next) => {
  const result = await documentRepositories.getDocumentById(req.params.id);
  if (!result) return next(new NotFoundError('Document tidak ditemukan'));
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${result.original_name}"`);
  return res.sendFile(path.resolve(result.file_path));
};

export const deleteDocument = async (req, res, next) => {
  const result = await documentRepositories.deleteDocument(req.params.id);
  if (!result) return next(new NotFoundError('Document tidak ditemukan'));
  await fs.unlink(result.file_path).catch(() => {});
  return response(res, 200, 'Document berhasil dihapus', { id: result.id });
};
