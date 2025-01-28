import { Context, Next } from 'hono'
import { BaseException } from '../exceptions/base.exception'

export async function errorHandler(c: Context, next: Next) {
    try {
        await next()
    } catch (error) {
        if (error instanceof BaseException) {
            return c.json({
                message: error.message,
                status: error.status
            }, error.status)
        }
        
        // Log unexpected errors
        console.error(error)
        return c.json({
            message: 'Internal Server Error',
            status: 500
        }, 500)
    }
} 