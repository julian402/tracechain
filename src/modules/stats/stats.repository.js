import prisma from '../../config/db.js'

export const getDashboardStats = async () => {
  const now = new Date()
  const in7Days = new Date()
  in7Days.setDate(now.getDate() + 7)

  const [
    totalLots,
    activeLots,
    expiredLots,
    quarantineLots,
    expiringLots,
    totalMovements,
    recentLots,
    activeAlerts
  ] = await Promise.all([
    prisma.lot.count(),
    prisma.lot.count({ where: { status: 'ACTIVE' } }),
    prisma.lot.count({ where: { status: 'EXPIRED' } }),
    prisma.lot.count({ where: { status: 'QUARANTINE' } }),
    prisma.lot.count({
      where: {
        status: 'ACTIVE',
        expirationDate: { gte: now, lte: in7Days }
      }
    }),
    prisma.movement.count(),
    prisma.lot.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: { select: { id: true, name: true } }
      }
    }),
    prisma.lot.findMany({
      where: {
        OR: [
          { status: 'EXPIRED' },
          { status: 'QUARANTINE' },
          {
            status: 'ACTIVE',
            expirationDate: { gte: now, lte: in7Days }
          }
        ]
      },
      select: {
        id: true,
        code: true,
        name: true,
        status: true,
        expirationDate: true,
        quantity: true,
        unit: true
      },
      orderBy: { expirationDate: 'asc' }
    })
  ])

  return {
    kpis: {
      totalLots,
      activeLots,
      expiredLots,
      quarantineLots,
      expiringIn7Days: expiringLots,
      totalMovements
    },
    recentLots,
    activeAlerts
  }
}