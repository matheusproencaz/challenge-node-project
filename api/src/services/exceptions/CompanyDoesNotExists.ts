import { BaseAppError } from "./BaseAppError";

export class CompanyDoesNotExistsError extends BaseAppError {
    constructor() {
        super('This Company does not exists!');
    }
}
