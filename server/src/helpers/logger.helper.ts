import { Logger, createLogger, format, transports } from 'winston'

export const initLogger = (): Logger => {
  const logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'your-service-name' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `quick-start-combined.log`.
      // - Write all logs error (and below) to `quick-start-error.log`.
      //
      new transports.File({ filename: 'quick-start-error.log' }),
    ],
  })

  if (process.env.NODE_ENV === 'developement') {
    logger.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      })
    )
  }

  return logger
}
