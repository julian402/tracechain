import prisma from '../../config/db.js'

export const createMovement = (data) => {
  return prisma.movement.create({
    data,
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      lot: { select: { id: true, code: true, name: true } }
    }
  })
}

export const findMovementsByLot = (lotId) => {
  return prisma.movement.findMany({
    where: { lotId },
    include: {
      createdBy: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const findAllMovements = () => {
  return prisma.movement.findMany({
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      lot: { select: { id: true, code: true, name: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}