import { initLogger } from '#helpers/logger.helper.js'
import { Request, Response, NextFunction } from 'express'

export const logger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.logger = initLogger()

    next()
}