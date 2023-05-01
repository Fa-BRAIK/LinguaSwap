import { Router } from 'express'
import { validateLogin } from '#validators/admin/auth.validator.js'
import AuthController from '#controllers/admin/auth.controller.js'
import { asyncHandler } from '#handlers/async.handler.js'

const router = Router()

router.post('/login', validateLogin(), asyncHandler(AuthController.login))

export default router 