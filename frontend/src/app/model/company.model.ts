import { Vehicle } from "./vehicle.model";

export interface Company {
    id: string;
    name: string;
    cnpj: string;
    address: string;
    phone: string;
    bikeParkingAmount: number;
    carParkingAmount: number;
    vehicles: Vehicle[];
}