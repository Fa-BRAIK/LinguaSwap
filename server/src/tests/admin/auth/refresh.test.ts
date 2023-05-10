import { describe, expect, it, beforeAll } from '@jest/globals'
import supertest from 'supertest'
import app from '../../../app'
import config from '../../config.json'
import { createAdmin } from '../../../database/seeders/_admin.seed'

describe('POST /admin/auth/refresh', () => {
  let email, password, refresh_token

  beforeAll(async () => {
    const credentials = await createAdmin()

    email = credentials.email
    password = credentials.password

    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    refresh_token = response.body?.data?.refresh_token
  })

  it('Should not return an access_token', async () => {
    const response = await supertest(app)
      .post('/admin/auth/refresh')
      .send({ token: `__${refresh_token}__` })
      .set(config.headers)

      expect(response.statusCode).toBe(401)
  })

  it('Should accept the request', async () => {
    const response = await supertest(app)
      .post('/admin/auth/refresh')
      .send({ token: refresh_token })
      .set(config.headers)

      expect(response.statusCode).toBe(201)
  })

  it('Should return an access token', async () => {
    const response = await supertest(app)
      .post('/admin/auth/refresh')
      .send({ token: refresh_token })
      .set(config.headers)

      expect(response.body.data.access_token).toBeDefined
  })
})
