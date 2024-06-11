import Joi from 'joi';
import { PASSWORD_REGEX } from '../../utils/commonConstants';

export const signUpValidationSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required()
})    

export const logInValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).required()
})   

export const updateValidationSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30)
}).min(1);  