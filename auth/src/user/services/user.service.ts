import { CreateUserDto } from "../dtos/user.dto";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Context } from "hono";
import { XataService } from "../../database/xata.service";

export class UserService {
    constructor() { }

    async createUser(data: CreateUserDto, context: Context) {
        const xataClient = XataService.getInstance(context).getXataClient();
        try {
            // encrypt password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);

            const user = await xataClient.db.users.create({
                id: uuidv4(),
                first_name: data.firstName.toLowerCase(),
                last_name: data.lastName.toLowerCase(),
                email: data.email.toLowerCase(),
                password: hashedPassword,
            });
            return context.json(user);
        } catch (error: any) {
            return context.json({ error }, error.status);
        }
    }

    async getUsers(context: Context, page: number = 1, size: number = 10) {
        try {
            const xataClient = XataService.getInstance(context).getXataClient();
            const users = await xataClient.db.users
                .select(["xata_id", "email", "first_name", "last_name"])
                .getPaginated({
                    pagination: {
                        size: size,
                        offset: (page - 1) * size,
                    },
                });
            return context.json(users.records);
        } catch (error: any) {
            return context.json({ error }, error.status);
        }
    }

    async getUserByEmail(email: string, context: Context) {
        try {
            const xataClient = XataService.getInstance(context).getXataClient();
            const user = await xataClient.db.users
                .select(['xata_id', 'email', 'first_name', 'last_name'])
                .filter('email', email).getFirst();
            if (!user) return context.json({ message: `User ${email} not found` }, 404);
            return context.json(user);
        } catch (error: any) {
            return context.json({ error: 'User not found' }, 404);
        }
    }
    async getUserByEmailDB(email: string, context: Context) {
        const xataClient = XataService.getInstance(context).getXataClient();
        const user = await xataClient.db.users.filter('email', email).getFirst();
        return user;
    }
    async currentUser(context: Context) {
        const currentUser = context.get('currentUser');
        const user = await this.getUserByEmail(currentUser.email, context);
        return user;
    }
}