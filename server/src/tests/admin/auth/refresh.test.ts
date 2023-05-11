import { describe, expect, it, beforeAll } from '@jest/globals'
import { agent as supertest, SuperAgentTest } from 'supertest'
import app from '../../../app'
import config from '../../config.json'
import { createAdmin } from '../../../database/seeders/_admin.seed'

describe('POST /admin/auth/refresh', () => {
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

    const response = await request
      .post('/admin/auth/login')
      .send({ email, password })

    refresh_token = response.body?.data?.refresh_token
  })

  it('Should not return an access_token', async () => {
    const response = await request
      .post('/admin/auth/refresh')
      .send({ token: `__${refresh_token}__` })

    expect(response.statusCode).toBe(401)
  })

  it('Should accept the request', async () => {
    const response = await request
      .post('/admin/auth/refresh')
      .send({ token: refresh_token })

    expect(response.statusCode).toBe(201)
  })

  it('Should return an access token', async () => {
    const response = await request
      .post('/admin/auth/refresh')
      .send({ token: refresh_token })

    expect(response.body.data?.access_token).toBeDefined
  })
})
