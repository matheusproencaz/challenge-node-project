import { BaseAppError } from "./BaseAppError";

export class CompanyDoesNotExistsError extends BaseAppError {
    
    constructor() {
        super('This Company does not exists!');

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        Error.captureStackTrace(this);
    }
}
