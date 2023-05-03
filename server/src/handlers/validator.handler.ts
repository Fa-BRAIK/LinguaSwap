import { Request } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

export const validationHandler = async (req: Request, validations: ValidationChain[]) => {
    for (let validation of validations) {
        const result = await validation.run(req)
        if (result['errors']?.length) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return null
    }

    return errors
}