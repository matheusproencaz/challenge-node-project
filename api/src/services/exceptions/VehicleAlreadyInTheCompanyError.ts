import { BaseAppError } from "./BaseAppError";

export class VehicleAlreadyInTheCompanyError extends BaseAppError {
    constructor() {
        super('Vehicle already in the Company!');
    }
}