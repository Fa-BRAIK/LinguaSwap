import { describe, expect, it, beforeAll } from '@jest/globals'
import { agent as supertest, SuperAgentTest } from 'supertest'
import app from '../../../app.js'
import config from '../../config.json'
import { createAdmin } from '../../../database/seeders/_admin.seed.js'

describe('MIDDLEWARE authenticate-admin', () => {
  let email: string, password: string, request: SuperAgentTest

  beforeAll(async () => {
    const credentials = await createAdmin()

    email = credentials.email
    password = credentials.password

    request = supertest(app)
    request.set(config.headers)
  })

  it('Should return 401 error', async () => {
    const response = await supertest(app)
      .post('/admin/auth/logout')
      .set(config.headers)

    expect(response.statusCode).toBe(401)
  })

  it('Should not return 401 error', async () => {
    let response = await request
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    const refresh_token = response.body?.data?.refresh_token
    const access_token = response.body?.data?.access_token

    request.auth(access_token, { type: 'bearer' })

    response = await request
        .post('/admin/auth/logout')
        .send({ token: refresh_token })

    expect(response.statusCode).not.toBe(401)
  })
})
