import { describe, expect, it, beforeEach, beforeAll } from '@jest/globals'
import { agent as supertest, SuperAgentTest, Request } from 'supertest'
import app from '../../app'
import config from '../config.json'
import { createAdmin } from '../../database/seeders/_admin.seed'

describe('Admin users routes', () => {
  let request: SuperAgentTest

  beforeAll(async () => {
    const credentials = await createAdmin()

    request = supertest(app)
    request.set(config.headers)

    const response = await request.post('/admin/auth/login').send(credentials)

    request.auth(response.body?.data?.access_token, { type: 'bearer' })
  })

  // TODO finish from here
  describe('POST /admin/users', async () => {

  })

  describe('PATCH /admin/users/:id', async () => {

  })

  describe('DELETE /admin/users/:id', async () => {

  })

  describe('GET /admin/users/:id', async () => {

  })
})
