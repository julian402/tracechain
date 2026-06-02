import { Router } from 'express'
import {
  createMovementController,
  getMovementsByLotController,
  getAllMovementsController
} from './movement.controller.js'
import { authenticate, authorize } from '../../middlewares/auth.js'
import { validate } from '../../middlewares/validate.js'
import { createMovementDto } from './movement.dto.js'

const router = Router()

router.get('/', authenticate, getAllMovementsController)
router.get('/lot/:lotId', authenticate, getMovementsByLotController)
router.post('/', authenticate, authorize('ADMIN', 'OPERATOR'), validate(createMovementDto), createMovementController)

export default router