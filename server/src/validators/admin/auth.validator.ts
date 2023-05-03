import { validationHandler } from '#handlers/validator.handler.js'
import { NextFunction, Request, Response } from 'express'
import { ValidationChain, body, validationResult } from 'express-validator'

export const validateLogin = () => 
    async (req: Request, res: Response, next: NextFunction) => {
        let validations: ValidationChain[] = [
            body('email').trim().isEmail(),
            body('password').notEmpty().trim()
        ]

        const errors = await validationHandler(req, validations)

        if (!errors) {
            return next()
        }

        res.status(400).json({ errors: errors.array() })
    }
