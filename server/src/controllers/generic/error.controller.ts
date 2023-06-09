import HttpStatusCode from '#enums/http-statuses.enum.js'
import { GenericError } from '#src/errors/generic.error.js'
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import pkg from 'jsonwebtoken'
const { JsonWebTokenError, TokenExpiredError } = pkg

const handleError = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    req.logger.error(error)

    if (!(error instanceof GenericError)) {
        error = handleNonGenericError(error)
    }

    if (error instanceof GenericError) {
        res.status(error.statusCode)
            .json({
                status: error.status,
                messages: [error.message],
            })
    } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            messages: ['Server error'],
        })
    }
}

const handleNonGenericError = (error: any): GenericError|null => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return new GenericError(
            500,
            'Server error'
        )
    } else if (error instanceof Prisma.PrismaClientInitializationError) {
        return new GenericError(
            500,
            'Server error'
        )
    }

    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
        const error = new GenericError(
          401,
          'You are not logge in! Please log in to get access'
        )
  
        return error
    }

    return null
}

export default {
    handleError
}
