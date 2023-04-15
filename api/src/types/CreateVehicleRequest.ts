import { VehiclesTypes } from "../entities/Vehicle";

export type CreateVehicleRequest = {
    brand: string;
    color: string;
    plate: string;
    type: VehiclesTypes;
}
