import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string()
        .email('Invalid email format'),
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(30, 'First name must not exceed 30 characters')
        .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(30, 'Last name must not exceed 30 characters')
        .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must not exceed 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
});

export type CreateUserDto = z.infer<typeof createUserSchema>;



export interface UserDto {
    email: string
    first_name: string
    id: string
    last_name: string
    password: string
    xata_createdat: any
    xata_id: any
    xata_updatedat: any
    xata_version: any
    xata: Xata
  }
  
  export interface Xata {
    createdAt: string
    updatedAt: string
    version: number
  }
  