import { LoginError } from '#errors/login.error.js'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '#config/index.js'

const prisma = new PrismaClient()

const login = async (req: Request, res: Response, next) => {
  const user = await prisma.admin.findFirst({
    where: { email: req.body.email },
  })

  if (!user) {
    throw new LoginError(401, 'Incorrect credentials')
  }

  const correctCredentials = await compare(req.body.password, user.password)

  if (!correctCredentials) {
    throw new LoginError(401, 'Incorrect credentials')
  }

  delete user.password, delete user.salt

  const access_token = jwt.sign(
    user,
    config('auth.jwt.access_token'),
    { expiresIn: '7d' }
  )

  const refresh_token = jwt.sign(
    user,
    config('auth.jwt.refresh_token'),
    { expiresIn: '7d' }
  )

  res.status(200).json({
    messages: ['User successfully logged in!'],
    data: {
        user,
        access_token,
        refresh_token
    }
  })
}

export default {
  login,
}
