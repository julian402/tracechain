import { Router } from 'express'
import { getDashboardStatsController } from './stats.controller.js'
import { authenticate } from '../../middlewares/auth.js'

const router = Router()

router.get('/dashboard', authenticate, getDashboardStatsController)

export default router