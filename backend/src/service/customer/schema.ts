import Joi from 'joi';

export const customerSchema = Joi.object().keys({
  name: Joi.string().required(),
  creationDate: Joi.date().required(),
});