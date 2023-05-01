import express from 'express'
import dotenv from 'dotenv'
import router from '#routes/routes.js'
import chalk from 'chalk'

dotenv.config()

import { config } from '#config/index.js'

console.log(config('app'), config('auth'))

const port = config('app.port')
const app = express()

app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(
    chalk.green.bgGreen(
      `Server side app listening on port ${port} in ${config('app.env')}`
    )
  )
})
