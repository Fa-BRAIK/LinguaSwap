import { GenericError } from './generic.error.js'
import HttpStatusCode from '#enums/http-statuses.enum.js'

export class EntityExistsError extends GenericError {
  constructor(message: string) {
    super(HttpStatusCode.BAD_REQUEST, message)
  }
}