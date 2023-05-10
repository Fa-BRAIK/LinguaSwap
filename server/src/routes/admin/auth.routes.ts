import { Router } from 'express'
import { validateLogin } from '#validators/admin/auth.validator.js'
import authController from '#controllers/admin/auth.controller.js'
import { asyncHandler } from '#handlers/async.handler.js'
import { authenticateAdmin } from '#middlewares/admin/authenticate-admin.middleware.js'
import { requiresPrisma } from '#middlewares/core/requires-prisma.middleware.js'

const router = Router()

router.post(
  '/login',
  validateLogin(),
  requiresPrisma,
  asyncHandler(authController.login)
)

router.post('/refresh', requiresPrisma, asyncHandler(authController.refreshToken))

router.post(
  '/logout',
  [requiresPrisma, authenticateAdmin],
  asyncHandler(authController.logout)
)

export default router
