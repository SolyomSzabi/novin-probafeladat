import Joi from 'joi';

export const userSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
});