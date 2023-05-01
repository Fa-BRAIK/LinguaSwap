import { Router } from 'express'
import { validateLogin } from '#validators/admin/auth.validator.js'
import AuthController from '#src/controllers/admin/auth.controller.js'

const router = Router()

router.post('/login', validateLogin(), AuthController.login)

export default router 