import HttpStatusCode from '#enums/http-statuses.enum.js'
import { GenericError } from '#src/errors/generic.error.js'
import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

const handleError = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if (!(error instanceof GenericError)) {
        error = handleNonGenericError(error)
    }

    if (error instanceof GenericError) {
        res.status(error.statusCode)
            .json({
                status: error.status,
                message: error.message,
                // fields: 
            })
    } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Server error',
            // fields: 
        })
    }
}

const handleNonGenericError = (error: any): GenericError|null => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error)

        return new GenericError(
            500,
            'Server error'
        )
    }
    // if (error instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
    //     const error = new GenericError(
    //       401,
    //       'You are not logge in! Please log in to get access'
    //     )
  
    //     return error
    // }

    return null
}

export default {
    handleError
}
