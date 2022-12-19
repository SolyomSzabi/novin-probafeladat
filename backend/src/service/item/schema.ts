import Joi from 'joi';

export const itemSchema = Joi.object().keys({
  itemName: Joi.string().required(),
  creationDate: Joi.date().required(),
  comment: Joi.string().required(),
  price: Joi.number().required(),
  status: Joi.string().required(),
});