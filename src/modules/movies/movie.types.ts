import { z } from 'zod';

export const createMovieSchema = z.object({
    title: z.string().min(1, 'El título es requerido').max(255),
    description: z.string().optional(),
    premiereDate: z.string()
    .refine(
      (val) =>
        /^\d{4}-\d{2}-\d{2}$/.test(val) || !isNaN(Date.parse(val)),
      'Formato de fecha inválido (usa YYYY-MM-DD o ISO 8601)'
    )
    .transform((val) => new Date(val)),
    categoryId: z.number().int().positive('El ID de categoría debe ser un número positivo'),
  });
  
export const updateMovieSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().optional().nullable(),
    premiereDate: z.string()
    .refine(
      (val) =>
        /^\d{4}-\d{2}-\d{2}$/.test(val) || !isNaN(Date.parse(val)),
      'Formato de fecha inválido (usa YYYY-MM-DD o ISO 8601)'
    )
    .transform((val) => new Date(val)).optional(),
    categoryId: z.number().int().positive().optional(),
  });
  
export type CreateMovieDto = z.infer<typeof createMovieSchema>;
export type UpdateMovieDto = z.infer<typeof updateMovieSchema>;
  
export interface MovieResponse {
    id: number;
    title: string;
    description: string | null;
    premiereDate: Date;
    categoryId: number;
    category?: {
      id: number;
      name: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }
  