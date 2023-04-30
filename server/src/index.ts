import express from 'express'
import dotenv from 'dotenv'
import { config } from '#src/config/index.js'
import router from '#src/routes/routes.js'
import chalk from 'chalk'

dotenv.config()

const port = config('app.port')
const app = express()

app.use(router)

app.listen(port, () => {
  console.log(
    chalk.green.bgGreen(`Server side app listening on port ${port} in ${config('app.env')}`)
  )
})
