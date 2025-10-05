"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.errors.map((e) => {
                    return {
                        fields: e.path.join("."),
                        message: e.message
                    };
                });
                return res.status(400).json({
                    success: false,
                    error: 'Validation dto error',
                    details: errors
                });
            }
            next(error);
        }
    };
};
exports.validate = validate;
