import { Router } from 'express'
import { validateLogin } from '#validators/admin/auth.validator.js'
import AuthController from '#controllers/admin/auth.controller.js'
import { asyncHandler } from '#handlers/async.handler.js'
import { authenticateAdmin } from '#middlewares/admin/authenticate-admin.middleware.js'

const router = Router()

router.post('/login', validateLogin(), asyncHandler(AuthController.login))
router.post('/refresh', asyncHandler(AuthController.refreshToken))
router.post('/logout', authenticateAdmin, asyncHandler(AuthController.logout))

export default router 