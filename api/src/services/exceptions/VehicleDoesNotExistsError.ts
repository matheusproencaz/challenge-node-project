import { BaseAppError } from "./BaseAppError";

export class VehicleDoesNotExistsError extends BaseAppError {
    constructor() {
        super('This Vehicle does not exists!');
    }
}
