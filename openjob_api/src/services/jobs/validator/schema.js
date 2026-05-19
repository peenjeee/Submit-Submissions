import Joi from 'joi';

export const jobCreateSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  job_type: Joi.string().allow('').optional(),
  experience_level: Joi.string().allow('').optional(),
  location_type: Joi.string().allow('').optional(),
  location_city: Joi.string().allow('').optional(),
  salary_min: Joi.number().integer().allow(null).optional(),
  salary_max: Joi.number().integer().allow(null).optional(),
  is_salary_visible: Joi.boolean().optional(),
  status: Joi.string().allow('').optional(),
});

export const jobUpdateSchema = Joi.object({
  company_id: Joi.string().optional(),
  category_id: Joi.string().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  job_type: Joi.string().allow('').optional(),
  experience_level: Joi.string().allow('').optional(),
  location_type: Joi.string().allow('').optional(),
  location_city: Joi.string().allow('').optional(),
  salary_min: Joi.number().integer().allow(null).optional(),
  salary_max: Joi.number().integer().allow(null).optional(),
  is_salary_visible: Joi.boolean().optional(),
  status: Joi.string().allow('').optional(),
}).min(1);

export const jobQuerySchema = Joi.object({
  title: Joi.string().allow('').optional(),
  'company-name': Joi.string().allow('').optional(),
});
