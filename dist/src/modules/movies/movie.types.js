"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.createMovieSchema = void 0;
const zod_1 = require("zod");
exports.createMovieSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'El título es requerido').max(255),
    description: zod_1.z.string().optional(),
    premiereDate: zod_1.z.string()
        .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val) || !isNaN(Date.parse(val)), 'Formato de fecha inválido (usa YYYY-MM-DD o ISO 8601)')
        .transform((val) => new Date(val)),
    categoryId: zod_1.z.number().int().positive('El ID de categoría debe ser un número positivo'),
});
exports.updateMovieSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255).optional(),
    description: zod_1.z.string().optional().nullable(),
    premiereDate: zod_1.z.string()
        .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val) || !isNaN(Date.parse(val)), 'Formato de fecha inválido (usa YYYY-MM-DD o ISO 8601)')
        .transform((val) => new Date(val)).optional(),
    categoryId: zod_1.z.number().int().positive().optional(),
});
