import { Router } from 'express'
import { validateLogin } from '#validators/admin/auth.validator.js'
import authController from '#controllers/admin/auth.controller.js'
import { asyncHandler } from '#handlers/async.handler.js'
import { authenticateAdmin } from '#middlewares/admin/authenticate-admin.middleware.js'

const router = Router()

router.post(
  '/login',
  validateLogin(),
  asyncHandler(authController.login)
)

router.post('/refresh', asyncHandler(authController.refreshToken))

router.post(
  '/logout',
  authenticateAdmin,
  asyncHandler(authController.logout)
)

export default router
