import { ChildEntity } from "typeorm";
import { Vehicle, VehiclesTypes } from "./Vehicle";

@ChildEntity(VehiclesTypes.CAR)
export class Car extends Vehicle { }