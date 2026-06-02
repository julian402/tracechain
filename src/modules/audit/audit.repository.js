import prisma from '../../config/db.js'

export const createAuditLog = (data) => {
  return prisma.auditLog.create({ data })
}

export const findAllAuditLogs = () => {
  return prisma.auditLog.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      lot: { select: { id: true, code: true, name: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const findAuditLogsByLot = (lotId) => {
  return prisma.auditLog.findMany({
    where: { lotId },
    include: {
      user: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const findAuditLogsByUser = (userId) => {
  return prisma.auditLog.findMany({
    where: { userId },
    include: {
      lot: { select: { id: true, code: true, name: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}