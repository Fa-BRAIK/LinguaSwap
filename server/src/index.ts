import express from 'express'
import dotenv from 'dotenv'
import { config } from './config/index.js'

dotenv.config()

const app = express()
const port = config('app.port')

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Server side app listening on port ${port}`)
})