import { registerMovement, getMovementsByLot, getAllMovements } from './movement.service.js'
import { successResponse } from '../../shared/response.helper.js'

export const createMovementController = async (req, res, next) => {
  try {
    const movement = await registerMovement(req.body, req.user.id)
    successResponse(res, movement, 201)
  } catch (error) {
    next(error)
  }
}

export const getMovementsByLotController = async (req, res, next) => {
  try {
    const movements = await getMovementsByLot(req.params.lotId)
    successResponse(res, movements)
  } catch (error) {
    next(error)
  }
}

export const getAllMovementsController = async (req, res, next) => {
  try {
    const movements = await getAllMovements()
    successResponse(res, movements)
  } catch (error) {
    next(error)
  }
}