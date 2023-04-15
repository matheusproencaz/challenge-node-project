import { Entity } from "typeorm";
import { Vehicle } from "./Vehicle";
import { VehiclesTypes } from "./enums/vehiclesType";

@Entity("Bikes")
export class Bike extends Vehicle {
    super(brand: string, color: string, plate: string) {
        this.type = VehiclesTypes.BIKE;
    }
}