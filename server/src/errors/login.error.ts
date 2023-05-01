import { GenericError } from './generic.error.js';

export class LoginError extends GenericError {
    constructor(statusCode: number, message: string) {
        super(statusCode, message)
    }
}