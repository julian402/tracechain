import prisma from '../../config/db.js'

export const createVisitWithFindings = (visitData, findings, userId) => {
  return prisma.visit.create({
    data: {
      ...visitData,
      createdById: userId,
      findings: {
        create: findings
      }
    },
    include: {
      findings: true,
      createdBy: { select: { id: true, name: true, email: true } },
      lot: { select: { id: true, code: true, name: true } }
    }
  })
}

export const findAllVisits = () => {
  return prisma.visit.findMany({
    include: {
      findings: true,
      createdBy: { select: { id: true, name: true, email: true } },
      lot: { select: { id: true, code: true, name: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const findVisitById = (id) => {
  return prisma.visit.findUnique({
    where: { id },
    include: {
      findings: true,
      createdBy: { select: { id: true, name: true, email: true } },
      lot: { select: { id: true, code: true, name: true } }
    }
  })
}

export const findVisitsByLot = (lotId) => {
  return prisma.visit.findMany({
    where: { lotId },
    include: {
      findings: true,
      createdBy: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}