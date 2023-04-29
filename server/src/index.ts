import express from 'express'
import dotenv from 'dotenv'
import { config } from './config/index.js'

dotenv.config()

const start = async () => {
  const port = config('app.port')
  const app = express()

  app.get('/', (req, res) => {
    res.send('Hello world')
  })

  app.listen(port, () => {
    console.log(`Server side app listening on port ${port}`)
  })
}

start()