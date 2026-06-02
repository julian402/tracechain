import { Router } from 'express'
import { registerController, loginController } from './auth.controller.js'
import { validate } from '../../middlewares/validate.js'
import { registerDto, loginDto } from './auth.dto.js'

const router = Router()

router.post('/register', validate(registerDto), registerController)
router.post('/login', validate(loginDto), loginController)

export default router

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, OPERATOR, AUDITOR]
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Email ya registrado
 */
router.post('/register', validate(registerDto), registerController)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso con token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', validate(loginDto), loginController)