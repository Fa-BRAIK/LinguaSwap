import { Admin, PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '#config/index.js'
import { LoginError } from '#errors/login.error.js'

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const prisma = req.prisma ?? new PrismaClient()

    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            const token = req.headers.authorization.split(' ')[1]

            let admin = <Admin>(jwt.verify(
                token, 
                config('auth.jwt.refresh_token')
            ))

            admin = await prisma.admin.findFirst({
                where: {
                    id: admin.id
                }
            })

            if (admin) {
                req.admin = admin

                next()
            }
        }

        throw new Error
    } catch(e) {
        next(new LoginError(401, 'You are not logged in! Please log in to get access'))
    }
}
