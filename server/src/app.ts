import express from 'express'
import router from '#routes/routes.js'
import { loadConfig } from '#src/config.js'
import { onlyJsonRequests } from '#middlewares/core/only-ajax.middleware.js'

loadConfig()

const app = express()

app.use(onlyJsonRequests)
app.use(express.json())
app.use(router)

export default app