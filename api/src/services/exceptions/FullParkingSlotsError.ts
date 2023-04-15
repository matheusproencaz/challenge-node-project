import { VehiclesTypes } from "../../entities/Vehicle";
import { BaseAppError } from "./BaseAppError";

export class FullParkingSlotsError extends BaseAppError {
    constructor(vehicleType: VehiclesTypes) {
        super(`Parking Slots for ${vehicleType} are full!`);
    }
}
