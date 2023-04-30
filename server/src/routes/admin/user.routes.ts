import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send('Admin user endpoint')
})

export default router