import express from 'express'
import dotenv from 'dotenv'
import { config } from '#src/config/index.js'
import router from '#src/routes/routes.js'

dotenv.config()

const port = config('app.port')
const app = express()

app.use(router)

app.listen(port, () => {
  console.log(`Server side app listening on port ${port}`)
})
