import { describe, expect, it, beforeAll } from '@jest/globals'
import supertest from 'supertest'
import app from '../../../app'
import config from '../../config.json'
import { createAdmin } from '../../../database/seeders/_admin.seed'

// TODO finish from here
describe('POST /admin/auth/refresh', () => {
  let email, password

  beforeAll(async () => {
    const credentials = await createAdmin()

    email = credentials.email
    password = credentials.password
  })


})
