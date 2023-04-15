import { ChildEntity } from "typeorm";
import { Vehicle, VehiclesTypes } from "./Vehicle";

@ChildEntity(VehiclesTypes.BIKE)
export class Bike extends Vehicle { }