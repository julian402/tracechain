import Joi from 'joi'

export const updateUserDto = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid('ADMIN', 'OPERATOR', 'AUDITOR').optional()
})

export const changePasswordDto = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
})