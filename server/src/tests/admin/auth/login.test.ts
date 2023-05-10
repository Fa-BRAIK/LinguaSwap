import { describe, expect, it, beforeAll } from '@jest/globals'
import supertest from 'supertest'
import app from '../../../app'
import config from '../../config.json'
import { createAdmin } from '../../../database/seeders/_admin.seed'

describe('POST /admin/auth/login', () => {
  let email, password

  beforeAll(async () => {
    const credentials = await createAdmin()

    email = credentials.email
    password = credentials.password
  })

  it('Should require an email', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ password })
      .set(config.headers)

    expect(response.statusCode).toBe(400)
  })

  it('Should require a passwordr', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email })
      .set(config.headers)

    expect(response.statusCode).toBe(400)
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

  it('Should return an access token', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    expect(response.body.access_token).toBeDefined
  })

  it('Should return a refresh token', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    expect(response.body.refresh_token).toBeDefined
  })

  it('Should return and admin object', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    expect(response.body?.admin).toBeDefined
  })


  it('Should not return the admin password', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    expect(response.body.admin?.password).toBeUndefined
  })

  it('Should not return the admin salt', async () => {
    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({ email, password })
      .set(config.headers)

    expect(response.body.admin?.salt).toBeUndefined
  })
})