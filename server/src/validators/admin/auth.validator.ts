import { NextFunction, Request, Response } from 'express'
import { ValidationChain, body, validationResult } from 'express-validator'

export const validateLogin = () => 
    async (req: Request, res: Response, next: NextFunction) => {
        let validations: ValidationChain[] = [
            body('email').trim().isEmail(),
            body('password').notEmpty().trim()
        ]

        for (let validation of validations) {
            const result = await validation.run(req)
            if (result['errors']?.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(400).json({ errors: errors.array() })
    }
