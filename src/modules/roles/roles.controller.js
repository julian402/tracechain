import {
  getRoles,
  getRole,
  createRoleService,
  updateRoleService,
  setPermissionsService,
  setRoleUsersService,
  deleteRoleService
} from './roles.service.js'
import { successResponse } from '../../shared/response.helper.js'

const getTargetOrganizationId = (req) =>
  req.user.isSuperAdmin
    ? (req.query.organizationId || req.organizationId)
    : req.organizationId

export const getRolesController = async (req, res, next) => {
  try {
    const roles = await getRoles(getTargetOrganizationId(req))
    successResponse(res, roles)
  } catch (error) {
    next(error)
  }
}

export const getRoleController = async (req, res, next) => {
  try {
    const role = await getRole(req.params.id, getTargetOrganizationId(req))
    successResponse(res, role)
  } catch (error) {
    next(error)
  }
}

export const createRoleController = async (req, res, next) => {
  try {
    const role = await createRoleService(req.body, getTargetOrganizationId(req))
    successResponse(res, role, 201)
  } catch (error) {
    next(error)
  }
}

export const updateRoleController = async (req, res, next) => {
  try {
    const role = await updateRoleService(req.params.id, req.body, getTargetOrganizationId(req))
    successResponse(res, role)
  } catch (error) {
    next(error)
  }
}

export const setRolePermissionsController = async (req, res, next) => {
  try {
    const role = await setPermissionsService(req.params.id, req.body.permissions, getTargetOrganizationId(req))
    successResponse(res, role)
  } catch (error) {
    next(error)
  }
}

export const setRoleUsersController = async (req, res, next) => {
  try {
    const role = await setRoleUsersService(req.params.id, req.body.userIds, getTargetOrganizationId(req))
    successResponse(res, role)
  } catch (error) {
    next(error)
  }
}

export const deleteRoleController = async (req, res, next) => {
  try {
    const result = await deleteRoleService(req.params.id, getTargetOrganizationId(req))
    successResponse(res, result)
  } catch (error) {
    next(error)
  }
}
