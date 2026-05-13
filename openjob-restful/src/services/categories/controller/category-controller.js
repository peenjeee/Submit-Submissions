import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import CategoryRepositories from '../repositories/category-repositories.js';

const categoryRepositories = new CategoryRepositories();

export const createCategory = async (req, res) => {
  const result = await categoryRepositories.createCategory(req.validated.name);
  return response(res, 201, 'Category berhasil ditambahkan', { id: result.id });
};

export const getCategories = async (req, res) => {
  const categories = await categoryRepositories.getCategories();
  return response(res, 200, 'Categories berhasil ditampilkan', { categories });
};

export const getCategoryById = async (req, res, next) => {
  const result = await categoryRepositories.getCategoryById(req.params.id);
  if (!result) return next(new NotFoundError('Category tidak ditemukan'));
  return response(res, 200, 'Category berhasil ditampilkan', result);
};

export const updateCategory = async (req, res, next) => {
  const category = await categoryRepositories.updateCategory(req.params.id, req.validated);
  if (!category) return next(new NotFoundError('Category tidak ditemukan'));
  return response(res, 200, 'Category berhasil diperbarui', category);
};

export const deleteCategory = async (req, res, next) => {
  const result = await categoryRepositories.deleteCategory(req.params.id);
  if (!result) return next(new NotFoundError('Category tidak ditemukan'));
  return response(res, 200, 'Category berhasil dihapus', { id: result.id });
};
