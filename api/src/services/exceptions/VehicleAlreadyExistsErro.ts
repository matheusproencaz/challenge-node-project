import { BaseAppError } from "./BaseAppError";

export class VehicleAlreadyExistsError extends BaseAppError {
    constructor() {
        super('This Vehicle Already Exists!');
    }
}
