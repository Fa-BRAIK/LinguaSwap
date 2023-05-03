import { LoginError } from '#errors/login.error.js'
import { Admin } from '@prisma/client'
import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '#config/index.js'
import moment from 'moment'
import { GenericError } from '#errors/generic.error.js'
import HttpStatusCode from '#enums/http-statuses.enum.js'

const login = async (req: Request, res: Response) => {
  const admin = await req.prisma.admin.findFirst({
    where: { email: req.body.email },
  })

  if (!admin) {
    throw new LoginError(HttpStatusCode.UNAUTHORIZED, 'Incorrect credentials')
  }

  const correctCredentials = await compare(req.body.password, admin.password)

  if (!correctCredentials) {
    throw new LoginError(HttpStatusCode.UNAUTHORIZED, 'Incorrect credentials')
  }

  delete admin.password, delete admin.salt

  const access_token = jwt.sign(admin, config('auth.jwt.access_token'), {
    expiresIn: '7d',
  })

  const refresh_token = jwt.sign(admin, config('auth.jwt.refresh_token'), {
    expiresIn: '7d',
  })

  const now = moment()

  await req.prisma.refreshToken.create({
    data: {
      authenticable_id: admin.id,
      authenticable_type: 'ADMIN',
      token: refresh_token,
      expires_at: now.add(1, 'year').toDate(),
    },
  })

  res.status(HttpStatusCode.OK).json({
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
    throw new GenericError(
      HttpStatusCode.UNAUTHORIZED,
      'Invalid token, unauthorized'
    )
  }

  const admin = <Admin>jwt.verify(token, config('auth.jwt.refresh_token'))

  const refresh_token = await req.prisma.refreshToken.findFirst({
    where: {
      authenticable_id: admin.id,
      authenticable_type: 'ADMIN',
    },
  })

  const now = moment()

  if (!refresh_token || moment(refresh_token.expires_at).isBefore(now)) {
    throw new GenericError(
      HttpStatusCode.CREATED,
      'Invalid token, unauthorized'
    )
  }

  delete admin['iat'], delete admin['exp']

  const access_token = jwt.sign(admin, config('auth.jwt.access_token'), {
    expiresIn: '7d',
  })

  res.status(HttpStatusCode.CREATED).json({
    messages: ['Refresh token used, new access token has being given'],
    data: {
      access_token,
    },
  })
}

const logout = async (req: Request, res: Response) => {
  console.log(req.admin)
  const token = req.body.token

  if (!token) {
    throw new GenericError(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Missing token')
  }

  const admin = <Admin>jwt.verify(token, config('auth.jwt.refresh_token'))

  await req.prisma.refreshToken.deleteMany({
    where: {
      authenticable_id: admin.id,
      authenticable_type: 'ADMIN',
      token,
    },
  })

  res.status(HttpStatusCode.OK).json({
    messages: ['Successfully logged out'],
  })
}

export default {
  login,
  refreshToken,
  logout,
}
