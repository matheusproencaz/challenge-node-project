import { BaseAppError } from "./BaseAppError";

export class CompanyAlreadyExistsError extends BaseAppError {
    constructor() {
        super('This Company Already Exists!');
    }
}
