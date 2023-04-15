import { Column, Entity, ManyToOne, PrimaryColumn, TableInheritance } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Company } from "./Company";

export enum VehiclesTypes {
    BIKE = "bike",
    CAR = "car",
}

@Entity('vehicles')
@TableInheritance({ column: 'type' })
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
        enum: VehiclesTypes,
        nullable: false
    })
    type: VehiclesTypes;

    @ManyToOne(() => Company, (company) => company.vehicles)
    company?: Company;

    constructor(){
        if(!this.id) {
            this.id = uuid();
        }
    }
}