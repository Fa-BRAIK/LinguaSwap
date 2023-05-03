import { asyncHandler } from '#handlers/async.handler.js'
import { authenticateAdmin } from '#middlewares/admin/authenticate-admin.middleware.js'
import { requiresPrisma } from '#middlewares/core/requires-prisma.middleware.js'
import { validateStoreUser, validateUpdateUser } from '#validators/admin/user.validator.js'
import { Router } from 'express'
import userController from '#controllers/admin/user.controller.js'

const router = Router()

router.post(
  '/',
  [requiresPrisma, authenticateAdmin],
  validateStoreUser(),
  asyncHandler(userController.store)
)

router.patch(
    '/:id',
    [requiresPrisma, authenticateAdmin],
    validateUpdateUser(),
    asyncHandler(userController.update)
)

export default router
