import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import cache from '../../../cache/redis-service.js';
import CacheKeys from '../../../cache/keys.js';
import { publishApplicationCreated } from '../../../queue/rabbitmq.js';
import ApplicationRepositories from '../repositories/application-repositories.js';

const applicationRepositories = new ApplicationRepositories();

export const createApplication = async (req, res) => {
  const { user_id, job_id, status } = req.validated;
  const result = await applicationRepositories.createApplication({ userId: user_id, jobId: job_id, status });
  await cache.delete(CacheKeys.applicationsByUser(result.user_id));
  await cache.delete(CacheKeys.applicationsByJob(result.job_id));
  publishApplicationCreated(result.id).catch((error) => console.error(error));
  return response(res, 201, 'Application berhasil ditambahkan', result);
};

export const getApplications = async (req, res) => {
  const applications = await applicationRepositories.getApplications();
  return response(res, 200, 'Applications berhasil ditampilkan', { applications });
};

export const getApplicationById = async (req, res, next) => {
  const key = CacheKeys.application(req.params.id);
  const cached = await cache.get(key);
  if (cached) {
    res.setHeader('X-Data-Source', 'cache');
    return response(res, 200, 'Application berhasil ditampilkan', cached);
  }
  const result = await applicationRepositories.getApplicationById(req.params.id);
  if (!result) return next(new NotFoundError('Application tidak ditemukan'));
  await cache.set(key, result);
  res.setHeader('X-Data-Source', 'database');
  return response(res, 200, 'Application berhasil ditampilkan', result);
};

export const getApplicationsByUser = async (req, res) => {
  const key = CacheKeys.applicationsByUser(req.params.userId);
  const cached = await cache.get(key);
  if (cached) {
    res.setHeader('X-Data-Source', 'cache');
    return response(res, 200, 'Applications berhasil ditampilkan', { applications: cached });
  }
  const applications = await applicationRepositories.getApplicationsByUser(req.params.userId);
  await cache.set(key, applications);
  res.setHeader('X-Data-Source', 'database');
  return response(res, 200, 'Applications berhasil ditampilkan', { applications });
};

export const getApplicationsByJob = async (req, res) => {
  const key = CacheKeys.applicationsByJob(req.params.jobId);
  const cached = await cache.get(key);
  if (cached) {
    res.setHeader('X-Data-Source', 'cache');
    return response(res, 200, 'Applications berhasil ditampilkan', { applications: cached });
  }
  const applications = await applicationRepositories.getApplicationsByJob(req.params.jobId);
  await cache.set(key, applications);
  res.setHeader('X-Data-Source', 'database');
  return response(res, 200, 'Applications berhasil ditampilkan', { applications });
};

export const updateApplication = async (req, res, next) => {
  const current = await applicationRepositories.getApplicationById(req.params.id);
  const application = await applicationRepositories.updateApplication(req.params.id, req.validated);
  if (!application) return next(new NotFoundError('Application tidak ditemukan'));
  await cache.delete(CacheKeys.application(req.params.id));
  if (current) {
    await cache.delete(CacheKeys.applicationsByUser(current.user_id));
    await cache.delete(CacheKeys.applicationsByJob(current.job_id));
  }
  return response(res, 200, 'Application berhasil diperbarui', application);
};

export const deleteApplication = async (req, res, next) => {
  const result = await applicationRepositories.deleteApplication(req.params.id);
  if (!result) return next(new NotFoundError('Application tidak ditemukan'));
  await cache.delete(CacheKeys.application(req.params.id));
  return response(res, 200, 'Application berhasil dihapus', { id: result.id });
};
