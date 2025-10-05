import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction)=> {
        try{
            await schema.parseAsync(req.body)
            next()
        }catch(error){
            if(error instanceof ZodError){
                const errors = error.errors.map((e)=>{
                    return {
                        fields: e.path.join("."),
                        message: e.message
                    }
                })
                return res.status(400).json({
                     success: false,
                     error: 'Validation dto error',
                     details: errors
                })
            }
            next(error)
        }   
    }
}