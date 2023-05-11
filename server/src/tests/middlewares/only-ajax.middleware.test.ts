import { describe, expect, it } from '@jest/globals'
import supertest from 'supertest'
import app from '../../app.js'
import config from '../config.json'

describe('MIDDLEWARE only-ajax', () => {
  it('Should return 421 error', async () => {
    const response = await supertest(app).post('/admin/auth/login')

    expect(response.statusCode).toBe(421)
  })

  it('Should pass', async () => {

    const response = await supertest(app)
      .post('/admin/auth/login')
      .send({})
      .set(config.headers)
      expect(response.statusCode).not.toBe(421)
  })
})
