export class CompanyAlreadyExistsError extends Error {
    
    constructor() {
        super('This Company Already Exists!');

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        Error.captureStackTrace(this);
    }
}
