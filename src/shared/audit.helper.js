import { createAuditLog } from '../modules/audit/audit.repository.js'

export const logAction = ({ action, entity, entityId, userId, lotId = null, oldData = null, newData = null }) => {
  return createAuditLog({
    action,
    entity,
    entityId,
    userId,
    lotId,
    oldData,
    newData
  })
}