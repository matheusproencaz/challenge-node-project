import { Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { VehiclesTypes } from "./enums/vehiclesType";

export abstract class Vehicle {

    @PrimaryColumn()
    id: string;

    @Column()
    brand: string;

    @Column()
    color: string;

    @Column()
    plate: string;

    @Column({
        type: 'enum',
        enum: VehiclesTypes
    })
    type: VehiclesTypes;

    constructor(brand: string, color: string, plate: string){
        if(!this.id) {
            this.id = uuid();
        }
        this.brand = brand;
        this.color = color;
        this.plate = plate;
    }
}