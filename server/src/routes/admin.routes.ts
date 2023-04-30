import { Router } from 'express';

import adminUserRouter from '#routes/admin/user.routes.js'

const router = Router() 

router.use('/users', adminUserRouter)

export default router 
