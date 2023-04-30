import express from 'express'
import dotenv from 'dotenv'
import { config } from './config/index.js'
import router from './routes/routes.js'

dotenv.config()

const start = async () => {
  const port = config('app.port')
  const app = express()

  app.use(router)

  app.listen(port, () => {
    console.log(`Server side app listening on port ${port}`)
  })
}

start()