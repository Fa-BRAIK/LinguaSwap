import { describe, expect, test } from '@jest/globals'
import supertest from 'supertest'
import app from '../app'
import config from './config.json'

describe('POST /admin/auth/login', () => {
  it('Should log in', async () => {
      const response = await supertest(app).post('/admin/auth/login').send({
         email: 'admin@farouk.ca',
         password: '289$kc87'
      })
      .set(config.headers)

      expect(response.statusCode).toBe(200)
  })
})
