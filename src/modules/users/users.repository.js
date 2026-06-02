import prisma from '../../config/db.js'

export const findAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

export const updateUser = (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

export const deleteUser = (id) => {
  return prisma.user.delete({ where: { id } })
}