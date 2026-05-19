import response from '../../../utils/response.js';
import { NotFoundError } from '../../../exceptions/index.js';
import JobRepositories from '../repositories/job-repositories.js';

const jobRepositories = new JobRepositories();

export const createJob = async (req, res) => {
  const payload = req.validated;
  const result = await jobRepositories.createJob({
    companyId: payload.company_id,
    categoryId: payload.category_id,
    createdBy: req.user.id,
    title: payload.title,
    description: payload.description,
    jobType: payload.job_type || null,
    experienceLevel: payload.experience_level || null,
    locationType: payload.location_type || null,
    locationCity: payload.location_city || null,
    salaryMin: payload.salary_min ?? null,
    salaryMax: payload.salary_max ?? null,
    isSalaryVisible: payload.is_salary_visible ?? false,
    status: payload.status || 'open',
  });
  return response(res, 201, 'Job berhasil ditambahkan', { id: result.id });
};

export const getJobs = async (req, res) => {
  const title = req.validatedQuery?.title;
  const companyName = req.validatedQuery?.['company-name'];
  const jobs = await jobRepositories.getJobs({ title, companyName });
  return response(res, 200, 'Jobs berhasil ditampilkan', { jobs });
};

export const getJobById = async (req, res, next) => {
  const result = await jobRepositories.getJobById(req.params.id);
  if (!result) return next(new NotFoundError('Job tidak ditemukan'));
  return response(res, 200, 'Job berhasil ditampilkan', result);
};

export const getJobsByCompany = async (req, res) => {
  const jobs = await jobRepositories.getJobsByCompany(req.params.companyId);
  return response(res, 200, 'Jobs berhasil ditampilkan', { jobs });
};

export const getJobsByCategory = async (req, res) => {
  const jobs = await jobRepositories.getJobsByCategory(req.params.categoryId);
  return response(res, 200, 'Jobs berhasil ditampilkan', { jobs });
};

export const updateJob = async (req, res, next) => {
  const job = await jobRepositories.updateJob(req.params.id, req.validated);
  if (!job) return next(new NotFoundError('Job tidak ditemukan'));
  return response(res, 200, 'Job berhasil diperbarui', job);
};

export const deleteJob = async (req, res, next) => {
  const result = await jobRepositories.deleteJob(req.params.id);
  if (!result) return next(new NotFoundError('Job tidak ditemukan'));
  return response(res, 200, 'Job berhasil dihapus', { id: result.id });
};
