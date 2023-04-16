import { BaseAppError } from "./BaseAppError";

export class VehicleWasNotInCompanyError extends BaseAppError {
    constructor() {
        super('Vehicle was not in the company!');
    }
}