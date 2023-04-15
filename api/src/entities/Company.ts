import { Column, Entity, PrimaryColumn } from "typeorm";
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

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
