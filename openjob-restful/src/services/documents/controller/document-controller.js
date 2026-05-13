import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';
import DocumentRepositories from '../repositories/document-repositories.js';

const documentRepositories = new DocumentRepositories();

export const createDocument = async (req, res, next) => {
  if (!req.file) return next(new InvariantError('Document wajib diunggah'));
  const result = await documentRepositories.createDocument({
    userId: req.user.id,
    originalName: req.file.originalname,
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    filePath: req.file.path,
    size: req.file.size,
  });
  return response(res, 201, 'Document berhasil ditambahkan', { id: result.id });
};

export const getDocuments = async (req, res) => {
  const documents = await documentRepositories.getDocuments();
  return response(res, 200, 'Documents berhasil ditampilkan', { documents });
};

export const getDocumentById = async (req, res, next) => {
  const result = await documentRepositories.getDocumentById(req.params.id);
  if (!result) return next(new NotFoundError('Document tidak ditemukan'));
  return response(res, 200, 'Document berhasil ditampilkan', result);
};

export const deleteDocument = async (req, res, next) => {
  const result = await documentRepositories.deleteDocument(req.params.id);
  if (!result) return next(new NotFoundError('Document tidak ditemukan'));
  return response(res, 200, 'Document berhasil dihapus', { id: result.id });
};
