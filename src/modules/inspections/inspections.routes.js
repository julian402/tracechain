import { Router } from 'express'
import {
  createVisitController,
  getAllVisitsController,
  getVisitByIdController,
  getVisitsByLotController
} from './inspections.controller.js'
import { authenticate, authorize } from '../../middlewares/auth.js'
import { validate } from '../../middlewares/validate.js'
import { createVisitDto } from './inspections.dto.js'

const router = Router()

router.get('/', authenticate, authorize('ADMIN', 'AUDITOR'), getAllVisitsController)
router.get('/lot/:lotId', authenticate, getVisitByIdController)
router.get('/:id', authenticate, getVisitsByLotController)
router.post('/', authenticate, authorize('ADMIN', 'AUDITOR', 'OPERATOR'), validate(createVisitDto), createVisitController)

export default router