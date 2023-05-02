import { LoginError } from '#errors/login.error.js'
import { Admin, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '#config/index.js'
import moment from 'moment'
import { GenericError } from '#errors/generic.error.js'

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

  const now = moment()

  await prisma.refreshToken.create({
    data: {
      authenticable_id: admin.id,
      authenticable_type: 'ADMIN',
      token: refresh_token,
      expires_at: now.add(1, 'year').toDate(),
    },
  })

  res.status(200).json({
    messages: ['User successfully logged in!'],
    data: {
      admin,
      access_token,
      refresh_token,
    },
  })
}

const refreshToken = async (req: Request, res: Response) => {
  const token = req.body.token

  if (!token) {
    throw new GenericError(401, 'Invalid token, unauthorized')
  }

  const admin = <Admin>jwt.verify(token, config('auth.jwt.refresh_token'))

  const refresh_token = await prisma.refreshToken.findFirst({
    where: {
      authenticable_id: admin.id,
      authenticable_type: 'ADMIN',
    },
  })

  const now = moment()

  if (!refresh_token || moment(refresh_token.expires_at).isBefore(now)) {
    throw new GenericError(401, 'Invalid token, unauthorized')
  }

  delete admin['iat'], delete admin['exp']

  const access_token = jwt.sign(admin, config('auth.jwt.access_token'), {
    expiresIn: '7d',
  })

  res.status(200).json({
    messages: ['Refresh token used, new access token has being given'],
    data: {
      access_token
    },
  })
}

export default {
  login,
  refreshToken
}
