import app from '#src/app.js'
import chalk from 'chalk'
import { config } from '#config/index.js'

const port = config('app.port')

app.listen(port, () => {
  console.log(
    chalk.green.bgGreen(
      `Server side app listening on port ${port} in ${config('app.env')}`
    )
  )
})
