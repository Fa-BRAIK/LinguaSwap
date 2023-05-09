import dotenv from 'dotenv'

export const loadConfig = () => {
  const env_file = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'

  dotenv.config({
    path: `./${env_file}`,
    override: true
  })
}
