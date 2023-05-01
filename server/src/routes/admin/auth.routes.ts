import { validateLogin } from '#src/validators/admin/auth.validator.js'
import { Router } from 'express'

const router = Router() 

router.get('/test', (req, res) => {
    res.send('ok')
})
router.post('/login', validateLogin(), (req, res) => {
    res.send('Login route')
})

export default router 