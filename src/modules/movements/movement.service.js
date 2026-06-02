import { createMovement, findMovementsByLot, findAllMovements } from './movement.repository.js'
import { findLotById } from '../lots/lot.repository.js'
import { AppError } from '../../shared/AppError.js'

export const registerMovement = async (data, userId) => {
  const lot = await findLotById(data.lotId)
  if (!lot) throw new AppError('Lote no encontrado', 404)

  return createMovement({ ...data, createdById: userId })
}

export const getMovementsByLot = async (lotId) => {
  const lot = await findLotById(lotId)
  if (!lot) throw new AppError('Lote no encontrado', 404)

  return findMovementsByLot(lotId)
}

export const getAllMovements = () => findAllMovements()