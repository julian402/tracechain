import { createVisitWithFindings, findAllVisits, findVisitById, findVisitsByLot } from './inspections.repository.js'
import { logAction } from '../../shared/audit.helper.js'
import { AppError } from '../../shared/AppError.js'

export const createVisit = async ({ findings, ...visitData }, userId) => {
  const visit = await createVisitWithFindings(visitData, findings, userId)

  await logAction({
    action: 'VISITA_EXTERNA',
    entity: 'Visit',
    entityId: visit.id,
    userId,
    lotId: visit.lotId ?? null,
    newData: visit
  })

  for (const finding of visit.findings) {
    await logAction({
      action: `INSPECTIONS_${finding.type}`,
      entity: 'Finding',
      entityId: finding.id,
      userId,
      lotId: visit.lotId ?? null,
      newData: finding
    })
  }

  return visit
}

export const getAllVisits = () => findAllVisits()

export const getVisitById = async (id) => {
  const visit = await findVisitById(id)
  if (!visit) throw new AppError('Visita no encontrada', 404)
  return visit
}

export const getVisitsByLot = async (lotId) => findVisitsByLot(lotId)