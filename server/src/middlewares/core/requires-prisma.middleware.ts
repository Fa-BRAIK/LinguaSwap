import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

export const requiresPrisma = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    req.prisma = new PrismaClient()

    next()
}