import { Logger, createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

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
    defaultMeta: { service: 'dev' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `quick-start-combined.log`.
      // - Write all logs error (and below) to `quick-start-error.log`.
      //
      new transports.DailyRotateFile({ level: 'error', filename: './logs/%DATE%_app_errors.log', datePattern: 'YYYY_MM_DD_HH' }),
      new transports.DailyRotateFile({ level: 'warning', filename: './logs/%DATE%_app.log', datePattern: 'YYYY_MM_DD_HH' }),
      new transports.DailyRotateFile({ level: 'info', filename: './logs/%DATE%_app.log', datePattern: 'YYYY_MM_DD_HH' }),
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
