import HttpStatusCode from '#enums/http-statuses.enum.js'
import { GenericError } from './generic.error.js'

export class NotFoundError extends GenericError {
    constructor(message: string) {
        super(HttpStatusCode.NOT_FOUND, message)
    }
}