import { Router } from 'express'
import { authenticate, authorize } from '../../middlewares/auth.js'
import {
  getAllAuditLogsController,
  getAuditLogsByLotController,
  getAuditLogsByUserController
} from './audit.controller.js'

const router = Router()

router.get('/', authenticate, authorize('ADMIN', 'AUDITOR'), getAllAuditLogsController)
router.get('/lot/:lotId', authenticate, authorize('ADMIN', 'AUDITOR'), getAuditLogsByLotController)
router.get('/user/:userId', authenticate, authorize('ADMIN', 'AUDITOR'), getAuditLogsByUserController)

export default router