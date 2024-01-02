import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .min(6)
    .max(50)
    .messages({
      'string.empty': 'Email required',
      'any.required': 'Email required',
      'string.email': 'Please enter valid email.',
      'string.min': 'Email length must be at least 3 characters.',
      'string.max': 'Email length must be less than or equal to 50 characters.',
    })
    .required(),
  password: Joi.string()
    .messages({
      'string.empty': 'Password Required.',
      'any.required': 'Password Required.',
    })
    .required(),
});

export default {
  loginSchema,
};
