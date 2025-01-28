import { Context, Next } from 'hono'
import { verify } from 'hono/jwt'
import { env } from 'hono/adapter'

declare module 'hono' {
    interface ContextVariableMap {
        currentUser: any
    }
}
export async function currentUserMiddleware(c: Context, next: Next) {
    const token = c.req.header('Authorization')?.split(' ')[1]

    if (!token) return c.json({ status: 'error', message: 'No token provided' }, 401)

    try {
        const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c)
        const decoded = await verify(token, JWT_SECRET)
        c.set('currentUser', decoded)
        await next()
    } catch (error) {
        return c.json({ status: 'error', message: 'Invalid token' }, 401)
    }
} 