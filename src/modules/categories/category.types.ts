import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(3, 'El nombre es requerido').max(100),
  });
  
export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
  
export interface CategoryResponse {
    id: number;
    name: string;
  }
  