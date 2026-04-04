// src/validations/studentsValidation.js

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const createStudentSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(12).max(65).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    avgMark: Joi.number().min(2).max(12).required(),
    onDuty: Joi.boolean(),
  }),
};

// Кастомний валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

// Схема для перевірки параметра studentId
export const studentIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().custom(objectIdValidator).required(),
  }),
};
