import { GenericError } from './generic.error.js'

export class NotFoundError extends GenericError {
    constructor(message: string) {
        super(404, message)
    }
}