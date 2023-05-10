import { asyncHandler } from '#handlers/async.handler.js'
import { authenticateAdmin } from '#middlewares/admin/authenticate-admin.middleware.js'
import { validateStoreUser, validateUpdateUser } from '#validators/admin/user.validator.js'
import { Router } from 'express'
import userController from '#controllers/admin/user.controller.js'

const router = Router()

router.use(authenticateAdmin)

router.post(
  '/',
  validateStoreUser(),
  asyncHandler(userController.store)
)

router.patch(
    '/:id([0-9]+)',
    validateUpdateUser(),
    asyncHandler(userController.update)
)

router.delete(
    '/:id([0-9]+)',
    asyncHandler(userController.remove)
)

router.get(
    '/:id([0-9]+)',
    asyncHandler(userController.read)
)

export default router
