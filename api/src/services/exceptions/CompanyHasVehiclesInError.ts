import { BaseAppError } from "./BaseAppError";

export class CompanyHasVehiclesInError extends BaseAppError {
    constructor() {
        super('This Company has vehicles in it! Can\'t be deleted!');
    }
}
