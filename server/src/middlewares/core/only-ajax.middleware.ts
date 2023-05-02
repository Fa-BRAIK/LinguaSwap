import { Request, Response, NextFunction } from 'express'

export const onlyJsonRequests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.xhr) {
    return res.status(421).json({
      message: 'Misdirected request',
    })
  }

  next()
}
