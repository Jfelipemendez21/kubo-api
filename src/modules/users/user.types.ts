import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(3, 'El nombre es requerido').max(200),
    email: z.string().min(10, 'El email es requerido').max(100)
  });
  
export type CreateUserDto = z.infer<typeof createUserSchema>;
  
export interface UserResponse {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
  }
  