import Joi from 'joi';

const addMovieSchema = Joi.object({
  movieImage: Joi.string().empty().allow('').required(),
  title: Joi.string()
    .min(1)
    .max(1000)
    .messages({
      'any.required': 'Title required',
      'string.empty': 'Title required',
      'string.min': 'Title length must be at least 1 characters.',
      'string.max': 'Title length must be less than or equal to 100 characters.',
    })
    .required(),
  publishingYear: Joi.string()
    .min(3)
    .max(4)
    .regex(/^\d+$/)
    .messages({
      'string.pattern.base': 'Only numeric values allowed.',
      'string.min': 'Publishing year Length must be less than or equal to 3 to 4 digits only',
      'string.max': 'Publishing year Length must be less than or equal to 3 to 4 digits only',
    })
    .required(),
});

const getMovieDetailsSchema = Joi.object({
  id: Joi.number().integer().greater(0).required(),
});

const updateMovieSchema = Joi.object({
  id: Joi.number().integer().greater(0).required(),
  movieImage: Joi.string().empty().allow('').required(),
  title: Joi.string()
    .min(1)
    .max(1000)
    .messages({
      'any.required': 'Title required',
      'string.empty': 'Title required',
      'string.min': 'Title length must be at least 1 characters.',
      'string.max': 'Title length must be less than or equal to 100 characters.',
    })
    .required(),
  publishingYear: Joi.string()
    .min(3)
    .max(4)
    .regex(/^\d+$/)
    .messages({
      'string.pattern.base': 'Only numeric values allowed.',
      'string.min': 'Publishing year Length must be less than or equal to 3 to 4 digits only',
      'string.max': 'Publishing year Length must be less than or equal to 3 to 4 digits only',
    })
    .required(),
});

export default {
  addMovieSchema,
  getMovieDetailsSchema,
  updateMovieSchema,
};
