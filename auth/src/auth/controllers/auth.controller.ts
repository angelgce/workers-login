import { Hono } from "hono";
import { AuthService } from "../services/auth.service";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../dtos/login.dto";

export class AuthController {
    private readonly path = '/auth'
    constructor(private readonly authService: AuthService) { }

    routes(app: Hono) {

        app.post(
            `${this.path}/login`,
            zValidator('json', loginSchema),
            async (context) => this.authService.login(await context.req.json(), context)
        )
        return app
    }


}