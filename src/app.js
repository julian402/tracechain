import express from 'express'
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
import authRoutes from './modules/auth/auth.routes.js'
import lotRoutes from './modules/lots/lot.routes.js'
import movementRoutes from './modules/movements/movement.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})
app.use('/api/auth', authRoutes)
app.use('/api/lots', lotRoutes)
app.use('/api/movements', movementRoutes)
app.use(errorHandler)

export default app


