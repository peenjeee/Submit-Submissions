import Joi from 'joi';

export const companyCreateSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().allow('').optional(),
});

export const companyUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  location: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
}).min(1);
