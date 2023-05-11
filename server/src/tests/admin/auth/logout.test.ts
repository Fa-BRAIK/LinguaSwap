import { describe, expect, it, beforeEach, beforeAll } from '@jest/globals'
import { agent as supertest, SuperAgentTest, Request } from 'supertest'
import app from '../../../app'
import config from '../../config.json'
import { createAdmin } from '../../../database/seeders/_admin.seed'

describe('POST /admin/auth/logout', () => {
  let email: string,
    password: string,
    refresh_token: string,
    request: SuperAgentTest

  beforeAll(async () => {
    const credentials = await createAdmin()

    email = credentials.email
    password = credentials.password

    request = supertest(app)
    request.set(config.headers)
  })

  beforeEach(async () => {
    const response = await request
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    refresh_token = response.body?.data?.refresh_token
    const access_token = response.body?.data?.access_token

    request.auth(access_token, { type: 'bearer' })
  })

  it('Should fail for not having a token', async () => {
    const response = await request
      .post('/admin/auth/logout')
      .send({ token: undefined })

    expect(response.statusCode).toBe(422)
  })

  it('Should fail for having an invalid token', async () => {
    const response = await request
      .post('/admin/auth/logout')
      .send({ token: `__${refresh_token}__` })

    expect(response.statusCode).toBe(401)
  })

  it('Should succeed', async () => {
    const response = await request
      .post('/admin/auth/logout')
      .send({ token: refresh_token })

    expect(response.statusCode).toBe(200)
  })
})
