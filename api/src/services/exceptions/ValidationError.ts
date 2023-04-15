export class ValidationError extends Error {
    validationErrors: string[];

    constructor(validationErrors: string[]) {
        super('Validation Error!');
        this.validationErrors = validationErrors;
        
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        Error.captureStackTrace(this);
    }
}