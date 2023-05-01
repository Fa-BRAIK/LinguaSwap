export class GenericError extends Error {
  protected _statusCode: number
  protected _status: string
  protected _isOperational: boolean

  constructor(statusCode: number, message: string) {
    super(message)

    this._statusCode = statusCode
    this._status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this._isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }

  get statusCode(): number {
    return this._statusCode
  }

  set statusCode(statusCode: number) {
    this._statusCode = statusCode
  }

  get status(): string {
    return this._status
  }

  set status(status: string) {
    this._status = status
  }

  get isOperational(): boolean {
    return this._isOperational
  }

  set isOperational(isOperational: boolean) {
    this._isOperational = isOperational
  }
}
