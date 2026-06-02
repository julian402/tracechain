import { createVisit, getAllVisits, getVisitById, getVisitsByLot } from './inspections.service.js'
import { successResponse } from '../../shared/response.helper.js'

export const createVisitController = async (req, res, next) => {
  try {
    const visit = await createVisit(req.body, req.user.id)
    successResponse(res, visit, 201)
  } catch (error) {
    next(error)
  }
}

export const getAllVisitsController = async (req, res, next) => {
  try {
    const visits = await getAllVisits()
    successResponse(res, visits)
  } catch (error) {
    next(error)
  }
}

export const getVisitByIdController = async (req, res, next) => {
  try {
    const visit = await getVisitById(req.params.id)
    successResponse(res, visit)
  } catch (error) {
    next(error)
  }
}

export const getVisitsByLotController = async (req, res, next) => {
  try {
    const visits = await getVisitsByLot(req.params.lotId)
    successResponse(res, visits)
  } catch (error) {
    next(error)
  }
}