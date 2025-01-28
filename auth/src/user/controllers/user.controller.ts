import { Hono } from "hono";
import { UserService } from "../services/user.service";
import { createUserSchema } from "../dtos/user.dto";
import { zValidator } from '@hono/zod-validator'
import { authMiddleware } from "../../auth/middlewares/auth.middleware";
import { currentUserMiddleware } from "../../auth/middlewares/current-user.middleware";

export class UserController {
    private readonly path = '/users'
    constructor(
        private readonly userService: UserService,
    ) {
    }

    routes(app: Hono) {

        // Get all users
        app.get(
            this.path,
            authMiddleware,
            async (context) => {
                const page = Number(context.req.query('page')) || 1;
                const size = Number(context.req.query('size')) || 10;
                return this.userService.getUsers(context, page, size);
            })

        // Get current user
        app.get(
            `${this.path}/me`,
            currentUserMiddleware,
            async (c) => {
                return await this.userService.currentUser(c)
            }
        )
        // Get user by email
        app.get(
            `${this.path}/:email`,
            (context) => this.userService.getUserByEmail(context.req.param('email'), context))


        // Create user
        app.post(
            this.path,
            zValidator('json', createUserSchema),
            async (context) =>
                this.userService.createUser(await context.req.json(), context)
        )

        return app
    }
}