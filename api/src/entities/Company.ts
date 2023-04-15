import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("companies")
export class Company {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    cnpj: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    bikeParkingAmount: number;

    @Column()
    carParkingAmount: number;

    // @OneToMany(() => Vehicle, vehicles => vehicles.company, {
    //     cascade: true
    // })
    // @JoinTable({ 
    //     name: "company_vehicles", 
    // })
    // vehicles?: Vehicle[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

    // addVehicle(vehicle: Vehicle) {
    //     if(this.vehicles == null) {
    //         this.vehicles = Array<Vehicle>();
    //     }
    //     this.vehicles.push(vehicle);
    // }
}
