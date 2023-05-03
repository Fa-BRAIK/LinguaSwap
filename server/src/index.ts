import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk'
import router from '#routes/routes.js'
import { onlyJsonRequests } from '#middlewares/core/only-ajax.middleware.js'
import { config } from '#config/index.js'

dotenv.config()

const port = config('app.port')
const app = express()

app.use(onlyJsonRequests)
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(
    chalk.green.bgGreen(
      `Server side app listening on port ${port} in ${config('app.env')}`
    )
  )
})
