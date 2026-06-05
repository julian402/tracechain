import Joi from 'joi'

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const passwordMessage = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número'

export const createUserDto = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'El nombre del usuario es obligatorio',
    'string.min': 'El nombre del usuario debe tener al menos 2 caracteres',
    'string.max': 'El nombre del usuario no puede superar 100 caracteres',
    'any.required': 'El nombre del usuario es obligatorio',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'El correo electrónico es obligatorio',
    'string.email': 'Ingresa un correo electrónico válido',
    'any.required': 'El correo electrónico es obligatorio',
  }),
  password: Joi.string().pattern(passwordPattern).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.pattern.base': passwordMessage,
    'any.required': 'La contraseña es obligatoria',
  }),
  roleId: Joi.string().uuid().required().messages({
    'string.guid': 'Selecciona un rol válido',
    'any.required': 'Selecciona un rol',
  }),
  organizationId: Joi.string().uuid().optional()
})

export const updateUserDto = Joi.object({
  name: Joi.string().min(2).max(100).optional().messages({
    'string.min': 'El nombre del usuario debe tener al menos 2 caracteres',
    'string.max': 'El nombre del usuario no puede superar 100 caracteres',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).optional().messages({
    'string.email': 'Ingresa un correo electrónico válido',
  }),
  roleId: Joi.string().uuid().allow(null).optional(),
  organizationId: Joi.string().uuid().allow(null).optional(),
  isSuperAdmin: Joi.boolean().optional()
})

export const changePasswordDto = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.empty': 'La contraseña actual es obligatoria',
    'any.required': 'La contraseña actual es obligatoria',
  }),
  newPassword: Joi.string().pattern(passwordPattern).required().messages({
    'string.empty': 'La nueva contraseña es obligatoria',
    'string.pattern.base': passwordMessage,
    'any.required': 'La nueva contraseña es obligatoria',
  })
})
