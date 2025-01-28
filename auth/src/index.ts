import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { container } from './config/container'

const app = new Hono()
app.use('*', logger())
app.use('*', cors())

const userController = container.resolve('userController')
userController.routes(app)

const authController = container.resolve('authController')
authController.routes(app)

export default app
