import HttpStatusCode from '#enums/http-statuses.enum.js'
import { Request, Response, NextFunction } from 'express'

export const onlyJsonRequests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.xhr) {
    return res.status(HttpStatusCode.MISDIRECTED_REQUEST).json({
      message: 'Misdirected request',
    })
  }

  next()
}
