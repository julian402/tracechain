import Joi from 'joi'

export const createMovementDto = Joi.object({
  lotId: Joi.string().uuid().required().messages({
    'string.guid': 'Selecciona un lote válido',
    'any.required': 'Selecciona un lote',
  }),
  type: Joi.string().valid(
    'CREATED', 'TRANSFERRED', 'TRANSFORMED', 'SPLIT', 'MERGED', 'STATUS_CHANGED'
  ).required().messages({
    'any.only': 'Selecciona un tipo de movimiento válido',
    'any.required': 'El tipo de movimiento es obligatorio',
  }),
  description: Joi.string().min(3).max(500).required().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.min': 'La descripción debe tener al menos 3 caracteres',
    'string.max': 'La descripción no puede superar 500 caracteres',
    'any.required': 'La descripción es obligatoria',
  }),
  quantity: Joi.number().positive().optional().messages({
    'number.base': 'La cantidad debe ser un número',
    'number.positive': 'La cantidad debe ser mayor que cero',
  }),
  fromLocation: Joi.string().max(200).optional().messages({
    'string.max': 'La ubicación origen no puede superar 200 caracteres',
  }),
  toLocation: Joi.string().max(200).optional().messages({
    'string.max': 'La ubicación destino no puede superar 200 caracteres',
  })
})
