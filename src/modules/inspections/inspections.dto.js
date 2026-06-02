import Joi from 'joi'

export const createVisitDto = Joi.object({
  visitType: Joi.string().valid('AUDITORIA', 'INTERVENTORIA', 'INSPECCION').required(),
  visitDate: Joi.date().required(),
  actReference: Joi.string().optional(),
  auditorEntity: Joi.string().required(),
  auditorName: Joi.string().required(),
  auditedProcess: Joi.string().optional(),
  objective: Joi.string().optional(),
  responsible: Joi.string().optional(),
  commitmentDate: Joi.date().optional(),
  correctiveActions: Joi.string().optional(),
  lotId: Joi.string().uuid().optional(),
  findings: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('NO_CONFORMIDAD', 'OBSERVACION', 'OPORTUNIDAD').required(),
      priority: Joi.string().valid('ALTA', 'MEDIA', 'BAJA').required(),
      criteria: Joi.string().optional(),
      description: Joi.string().required(),
      deadline: Joi.date().optional()
    })
  ).min(1).required()
})