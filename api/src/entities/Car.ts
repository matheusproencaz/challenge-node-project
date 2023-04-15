import { Entity } from "typeorm";
import { Vehicle } from "./Vehicle";
import { VehiclesTypes } from "./enums/vehiclesType";

@Entity("Cars")
export class Car extends Vehicle {
    super(brand: string, color: string, plate: string) {
        this.type = VehiclesTypes.CAR;
    }
}