import { Company } from "./company.model";

export enum VehicleType {
    CAR = 'car',
    BIKE = 'bike',
}

export interface Vehicle {
    id: string;
    brand: string;
    color: string;
    plate: string;
    type: VehicleType;
    company: Company
}