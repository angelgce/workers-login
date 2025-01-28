import { Context } from "hono";
import { UserService } from "../../user/services/user.service";
import { LoginDto } from "../dtos/login.dto";
import * as bcrypt from 'bcryptjs';
import jwt from '@tsndr/cloudflare-worker-jwt'
import { env } from "hono/adapter";

export class AuthService {
    constructor(private readonly userService: UserService) { }

    async login(loginDto: LoginDto, context: Context) {

        const user = await this.userService.getUserByEmailDB(loginDto.email, context);
        if (!user) return context.json({ error: 'User not found' }, 404);

        const { password } = user;
        if (!password) return context.json({ error: 'User not found' }, 404);

        const isValid = await this.isValidPassword(loginDto.password, password);
        if (!isValid) return context.json({ error: 'Invalid password' }, 401);

        if (!user.email) return context.json({ error: 'User not found' }, 404);
        const token = await this.getToken(user.xata_id, user.email, context)

        return context.json({ token });
    }
    async isValidPassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
    async getToken(userId: string, email: string, context: Context) {
        const { JWT_SECRET } = env<{ JWT_SECRET: string }>(context)
        const token = await jwt.sign({
            sub: userId,
            email: email,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hora
        }, JWT_SECRET);
        return token;
    }
}   