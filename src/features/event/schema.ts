import Joi from 'joi';
import { OBJECT_ID } from '../../utils/commonConstants';

export const eventValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    status: Joi.boolean().required()
});  

export const updateValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  description: Joi.string(),
  location: Joi.string(),
  status: Joi.boolean()
}).min(1);  

export const pathValidationSchema = Joi.object({
  id: Joi.string().regex(OBJECT_ID).required(),
});

export const queryValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    status: Joi.boolean().optional()
});
