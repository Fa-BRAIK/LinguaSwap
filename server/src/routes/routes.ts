import { Router } from 'express';
import adminRoutes from '#routes/admin.routes.js'

import ErrorController from '#controllers/generic/error.controller.js'
import { requiresPrisma } from '#middlewares/core/requires-prisma.middleware.js';

const router = Router()

router.use(requiresPrisma)
router.use('/admin', adminRoutes)

router.get('/', (req, res) => {
    res.send('Hello world')
})

router.use(ErrorController.handleError)

export default router
