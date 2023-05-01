import { LoginError } from '#errors/login.error.js'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '#config/index.js'
import moment from 'moment'
import auth from '#config/auth.js'

const prisma = new PrismaClient()

const login = async (req: Request, res: Response, next) => {
  const admin = await prisma.admin.findFirst({
    where: { email: req.body.email },
  })

  if (!admin) {
    throw new LoginError(401, 'Incorrect credentials')
  }

  const correctCredentials = await compare(req.body.password, admin.password)

  if (!correctCredentials) {
    throw new LoginError(401, 'Incorrect credentials')
  }

  delete admin.password, delete admin.salt

  const access_token = jwt.sign(admin, config('auth.jwt.access_token'), {
    expiresIn: '7d',
  })

  const refresh_token = jwt.sign(admin, config('auth.jwt.refresh_token'), {
    expiresIn: '7d',
  })

  const refreshToken = await prisma.refreshToken.create({
    data: {
      authenticable_id: admin.id,
      authenticable_type: 'ADMIN',
      token: refresh_token,
      expires_at: moment().add(1, 'year').toDate(),
    },
  })

  res.status(200).json({
    messages: ['User successfully logged in!'],
    data: {
      admin,
      access_token,
      refreshToken,
    },
  })
}

export default {
  login,
}
