"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'El nombre es requerido').max(200),
    email: zod_1.z.string().min(10, 'El email es requerido').max(100)
});
