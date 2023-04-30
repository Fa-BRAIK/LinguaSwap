import { Router } from 'express';
import adminRoutes from './admin.routes.js'

const router = Router()

router.use('/admin', adminRoutes)

router.get('/', (req, res) => {
    res.send('Hello world')
})

export default router
