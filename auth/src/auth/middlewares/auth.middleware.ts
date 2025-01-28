import { Context, Next } from 'hono'
import { verify } from 'hono/jwt'
import { env } from 'hono/adapter'

export async function authMiddleware(c: Context, next: Next) {
    const token = c.req.header('Authorization')?.split(' ')[1]
    
    if (!token) return c.json({ status: 'error', message: 'Unauthorized - No token provided' }, 401)

    try {
        const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)
        const decoded = await verify(token, JWT_SECRET)
        c.set('user', decoded)
        await next()
    } catch (error) {
        return c.json({ status: 'error', message: 'Unauthorized - Invalid token' }, 401)
    }
} 