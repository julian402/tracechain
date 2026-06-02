import Joi from 'joi'

export const createMovementDto = Joi.object({
  lotId: Joi.string().uuid().required(),
  type: Joi.string().valid(
    'CREATED', 'TRANSFERRED', 'TRANSFORMED', 'SPLIT', 'MERGED', 'STATUS_CHANGED'
  ).required(),
  description: Joi.string().min(3).max(500).required(),
  quantity: Joi.number().positive().optional(),
  fromLocation: Joi.string().max(200).optional(),
  toLocation: Joi.string().max(200).optional()
})