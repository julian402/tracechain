import { Router } from 'express'
import {
  getRolesController,
  getRoleController,
  createRoleController,
  updateRoleController,
  setRolePermissionsController,
  setRoleUsersController,
  deleteRoleController
} from './roles.controller.js'
import { authenticate, requirePermission } from '../../middlewares/auth.js'
import { validate } from '../../middlewares/validate.js'
import { createRoleDto, updateRoleDto, setPermissionsDto, setRoleUsersDto } from './roles.dto.js'

const router = Router()

// Listar roles también lo necesita la gestión de usuarios (dropdown de rol).
router.get('/', authenticate, requirePermission('roles:read', 'roles:manage', 'users:manage'), getRolesController)
router.get('/:id', authenticate, requirePermission('roles:read', 'roles:manage'), getRoleController)
router.post('/', authenticate, requirePermission('roles:manage'), validate(createRoleDto), createRoleController)
router.patch('/:id', authenticate, requirePermission('roles:manage'), validate(updateRoleDto), updateRoleController)
router.put('/:id/permissions', authenticate, requirePermission('roles:manage'), validate(setPermissionsDto), setRolePermissionsController)
router.put('/:id/users', authenticate, requirePermission('roles:manage'), validate(setRoleUsersDto), setRoleUsersController)
router.delete('/:id', authenticate, requirePermission('roles:manage'), deleteRoleController)

export default router
