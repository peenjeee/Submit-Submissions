import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin', 'company').default('user'),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  role: Joi.string().valid('user', 'admin', 'company'),
}).min(1);
