import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import cache from '../../../cache/redis-service.js';
import CacheKeys from '../../../cache/keys.js';
import CompanyRepositories from '../repositories/company-repositories.js';

const companyRepositories = new CompanyRepositories();

export const createCompany = async (req, res) => {
  const { name, location, description = null } = req.validated;
  const result = await companyRepositories.createCompany({ name, location, description, createdBy: req.user.id });
  await cache.delete(CacheKeys.company(result.id));
  return response(res, 201, 'Company berhasil ditambahkan', { id: result.id });
};

export const getCompanies = async (req, res) => {
  const companies = await companyRepositories.getCompanies();
  return response(res, 200, 'Companies berhasil ditampilkan', { companies });
};

export const getCompanyById = async (req, res, next) => {
  const key = CacheKeys.company(req.params.id);
  const cached = await cache.get(key);
  if (cached) {
    res.setHeader('X-Data-Source', 'cache');
    return response(res, 200, 'Company berhasil ditampilkan', cached);
  }
  const result = await companyRepositories.getCompanyById(req.params.id);
  if (!result) return next(new NotFoundError('Company tidak ditemukan'));
  await cache.set(key, result);
  res.setHeader('X-Data-Source', 'database');
  return response(res, 200, 'Company berhasil ditampilkan', result);
};

export const updateCompany = async (req, res, next) => {
  const company = await companyRepositories.updateCompany(req.params.id, req.validated);
  if (!company) return next(new NotFoundError('Company tidak ditemukan'));
  await cache.delete(CacheKeys.company(req.params.id));
  return response(res, 200, 'Company berhasil diperbarui', company);
};

export const deleteCompany = async (req, res, next) => {
  const result = await companyRepositories.deleteCompany(req.params.id);
  if (!result) return next(new NotFoundError('Company tidak ditemukan'));
  await cache.delete(CacheKeys.company(req.params.id));
  return response(res, 200, 'Company berhasil dihapus', { id: result.id });
};
