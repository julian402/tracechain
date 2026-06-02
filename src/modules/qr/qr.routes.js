import { Router } from 'express'
import { getQrController } from './qr.controller.js'
import { authenticate } from '../../middlewares/auth.js'

const router = Router()

router.get('/:qrCode', authenticate, getQrController)

export default router