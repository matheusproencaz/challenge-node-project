export class BaseAppError extends Error {
    constructor(message:string) {
        super(message);
        
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        Error.captureStackTrace(this);
    }
}