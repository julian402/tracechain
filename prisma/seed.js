import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

async function main() {
  // Usuario admin
  const hashed = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tracechain.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@tracechain.com',
      password: hashed,
      role: 'ADMIN'
    }
  })

  // Lote principal
  const lot1 = await prisma.lot.upsert({
    where: { code: 'LOT-SEED-001' },
    update: {},
    create: {
      code: 'LOT-SEED-001',
      qrCode: uuidv4(),
      name: 'Lote Mango Premium',
      quantity: 500,
      unit: 'kg',
      status: 'ACTIVE',
      productionDate: new Date('2026-06-01'),
      expirationDate: new Date('2026-06-15'),
      sanitaryRecord: 'SAN-2026-001',
      storageTemp: 8.5,
      storageHumidity: 75,
      notes: 'Lote de prueba seed',
      createdById: admin.id
    }
  })

  // Lote hijo
  await prisma.lot.upsert({
    where: { code: 'LOT-SEED-002' },
    update: {},
    create: {
      code: 'LOT-SEED-002',
      qrCode: uuidv4(),
      name: 'Lote Mango Fraccionado',
      quantity: 200,
      unit: 'kg',
      status: 'ACTIVE',
      productionDate: new Date('2026-06-01'),
      expirationDate: new Date('2026-06-15'),
      parentLotId: lot1.id,
      createdById: admin.id
    }
  })

  // Movimiento
  await prisma.movement.create({
    data: {
      type: 'TRANSFERRED',
      description: 'Traslado de bodega principal a distribución',
      quantity: 200,
      fromLocation: 'Bodega Principal',
      toLocation: 'Bodega Distribución',
      lotId: lot1.id,
      createdById: admin.id
    }
  })

  console.log('Seed ejecutado correctamente')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())