import {
  findAllAuditLogs,
  findAuditLogsByLot,
  findAuditLogsByUser
} from './audit.repository.js'
import { successResponse } from '../../shared/response.helper.js'

export const getAllAuditLogsController = async (req, res, next) => {
  try {
    const logs = await findAllAuditLogs()
    successResponse(res, logs)
  } catch (error) {
    next(error)
  }
}

export const getAuditLogsByLotController = async (req, res, next) => {
  try {
    const logs = await findAuditLogsByLot(req.params.lotId)
    successResponse(res, logs)
  } catch (error) {
    next(error)
  }
}

export const getAuditLogsByUserController = async (req, res, next) => {
  try {
    const logs = await findAuditLogsByUser(req.params.userId)
    successResponse(res, logs)
  } catch (error) {
    next(error)
  }
}