import { describe, expect, it, beforeAll } from '@jest/globals'
import { agent as supertest, SuperAgentTest, Request } from 'supertest'
import app from '../../app'
import config from '../config.json'
import { createAdmin } from '../../database/seeders/_admin.seed'
import { User } from '@prisma/client'

describe('Admin users routes', () => {
  let request: SuperAgentTest

  beforeAll(async () => {
    const credentials = await createAdmin()

    request = supertest(app)
    request.set(config.headers)

    const response = await request.post('/admin/auth/login').send(credentials)

    request.auth(response.body?.data?.access_token, { type: 'bearer' })
  })

  let user: User

  describe('POST /admin/users', () => {
    const name = 'John Doe'
    const email = 'johndoe@example.com'

    it('Should fail if we are not connected', async () => {
      const response = await supertest(app)
        .post('/admin/users')
        .set(config.headers)

      expect(response.statusCode).toBe(401)
    })

    it('Should successfully create a user', async () => {
      const response = await request.post('/admin/users').send({
        name,
        email,
        password: '@Testing2023',
        password_confirmation: '@Testing2023',
      })

      expect(response.statusCode).toBe(201)
      expect(response.body.data?.user).toBeDefined
      expect(response.body.data.user.email).toBe(email)
      expect(response.body.data.user.name).toBe(name)
      expect(response.body.data.user.password).toBeUndefined
      expect(response.body.user.salt).toBeUndefined

      user = response.body.user
    })

    it('Should fail if the user already exists', async () => {
      const response = await request.post('/admin/users').send({
        name: 'John Doe',
        email: 'johndoe@example.com',
      })

      expect(response.statusCode).toBe(400)
      expect(response.body.messages).toContain('Email already exists!')
    })
  })

  describe('PATCH /admin/users/:id', () => {
    const name = 'John Doe'
    const email = 'johndoe@example.com'

    it('Should fail if we are not connected', async () => {
      const response = await supertest(app)
        .patch(`/admin/users/${user.id}`)
        .set(config.headers)

      expect(response.statusCode).toBe(401)
    })

    it('Should successfully update a user', async () => {
      const response = await request
        .patch(`/admin/users/${user.id}`)
        .send({
          name: 'John Doe updated',
          email: 'jhohndoeupdated@example.com'
        })

      expect(response.statusCode).toBe(200)
      expect(response.body.data?.user).toBeDefined
      expect(response.body.data.user.email).toBe('jhohndoeupdated@example.com')
      expect(response.body.data.user.name).toBe('John Doe updated')
      expect(response.body.data.user.password).toBeUndefined
      expect(response.body.user.salt).toBeUndefined

      user = response.body.user
    })
  })

  describe('GET /admin/users/:id', () => {
    it('Should fail if we are not connected', async () => {
      const response = await supertest(app)
        .get(`/admin/users/${user.id}`)
        .set(config.headers)

      expect(response.statusCode).toBe(401)
    })

    it('Should successfully get a user', async () => {
      const response = await request.get(`/admin/users/${user.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.data?.user).toBeDefined
      expect(response.body.data.user.email).toBe(user.email)
      expect(response.body.data.user.name).toBe(user.name)
      expect(response.body.data.user.password).toBeUndefined
      expect(response.body.user.salt).toBeUndefined

      user = response.body.user
    })
  })

  describe('DELETE /admin/users/:id', () => {
    it('Should fail if we are not connected', async () => {
      const response = await supertest(app)
        .delete(`/admin/users/${user.id}`)
        .set(config.headers)

      expect(response.statusCode).toBe(401)
    })

    it('Should successfully delete a user', async () => {
      const response = await request.delete(`/admin/users/${user.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.messages).toContain('User successfully deleted!')
    })
  })
})
