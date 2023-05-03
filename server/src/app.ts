import express from 'express'
import dotenv from 'dotenv'
import router from '#routes/routes.js'
import { onlyJsonRequests } from '#middlewares/core/only-ajax.middleware.js'
 
dotenv.config()

const app = express()

app.use(onlyJsonRequests)
app.use(express.json())
app.use(router)

export default app