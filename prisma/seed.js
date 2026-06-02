import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashed = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@tracechain.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@tracechain.com',
      password: hashed,
      role: 'ADMIN'
    }
  })

  console.log('Seed ejecutado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())