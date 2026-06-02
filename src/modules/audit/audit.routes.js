import { Router } from 'express'
import { authenticate, authorize } from '../../middlewares/auth.js'
import {
  getAllAuditLogsController,
  getAuditLogsByLotController,
  getAuditLogsByUserController,
  getAuditLogsByFiltersController
} from './audit.controller.js'

const router = Router()

router.get('/', authenticate, authorize('ADMIN', 'AUDITOR'), getAllAuditLogsController)
router.get('/lot/:lotId', authenticate, authorize('ADMIN', 'AUDITOR'), getAuditLogsByLotController)
router.get('/user/:userId', authenticate, authorize('ADMIN', 'AUDITOR'), getAuditLogsByUserController)
router.get('/search', authenticate, authorize('ADMIN', 'AUDITOR'), getAuditLogsByFiltersController)
export default router