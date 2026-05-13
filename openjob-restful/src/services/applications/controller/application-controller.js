import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import ApplicationRepositories from '../repositories/application-repositories.js';

const applicationRepositories = new ApplicationRepositories();

export const createApplication = async (req, res) => {
  const { user_id, job_id, status } = req.validated;
  const result = await applicationRepositories.createApplication({ userId: user_id, jobId: job_id, status });
  return response(res, 201, 'Application berhasil ditambahkan', { id: result.id });
};

export const getApplications = async (req, res) => {
  const applications = await applicationRepositories.getApplications();
  return response(res, 200, 'Applications berhasil ditampilkan', { applications });
};

export const getApplicationById = async (req, res, next) => {
  const result = await applicationRepositories.getApplicationById(req.params.id);
  if (!result) return next(new NotFoundError('Application tidak ditemukan'));
  return response(res, 200, 'Application berhasil ditampilkan', result);
};

export const getApplicationsByUser = async (req, res) => {
  const applications = await applicationRepositories.getApplicationsByUser(req.params.userId);
  return response(res, 200, 'Applications berhasil ditampilkan', { applications });
};

export const getApplicationsByJob = async (req, res) => {
  const applications = await applicationRepositories.getApplicationsByJob(req.params.jobId);
  return response(res, 200, 'Applications berhasil ditampilkan', { applications });
};

export const updateApplication = async (req, res, next) => {
  const application = await applicationRepositories.updateApplication(req.params.id, req.validated);
  if (!application) return next(new NotFoundError('Application tidak ditemukan'));
  return response(res, 200, 'Application berhasil diperbarui', application);
};

export const deleteApplication = async (req, res, next) => {
  const result = await applicationRepositories.deleteApplication(req.params.id);
  if (!result) return next(new NotFoundError('Application tidak ditemukan'));
  return response(res, 200, 'Application berhasil dihapus', { id: result.id });
};
