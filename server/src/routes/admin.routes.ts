import { Router } from 'express';

import adminAuthRouter from '#routes/admin/auth.routes.js'
import adminUserRouter from '#routes/admin/user.routes.js'

const router = Router() 

router.use('/auth', adminAuthRouter)
router.use('/users', adminUserRouter)

export default router 
