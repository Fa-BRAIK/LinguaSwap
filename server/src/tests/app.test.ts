import { describe, expect, it, beforeAll } from '@jest/globals'
import supertest from 'supertest'
import app from '../app'
import config from './config.json'
import { createAdmin } from '../database/seeders/_admin.seed'

describe('POST /admin/auth/login', () => {
  let email, password

  beforeAll(async () => {
    const credentials = await createAdmin()

    email = credentials.email
    password = credentials.password

    console.log(email, password)
  })

  it('It should not login', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({
        email,
        password: `__${password}__`,
      })
      .set(config.headers)

    expect(response.statusCode).toBe(401)
  })

  it('Should login', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    expect(response.statusCode).toBe(200)
  })
})
