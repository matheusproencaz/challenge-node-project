import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Vehicle, VehiclesTypes } from "./Vehicle";
import { VehicleDoesNotExistsError } from "../services/exceptions/VehicleDoesNotExistsError";
import { FullParkingSlotsError } from "../services/exceptions/FullParkingSlotsError";
import { VehicleAlreadyInTheCompanyError } from "../services/exceptions/VehicleAlreadyInTheCompanyError";

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

    @OneToMany(() => Vehicle, (vehicles) => vehicles.company)
    vehicles?: Vehicle[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

    addVehicle(vehicle: Vehicle) {
        if(!vehicle) throw new VehicleDoesNotExistsError();

        if(!this.vehicles) {
            this.vehicles = Array<Vehicle>();
        }

        if(!this.hasParkingSlots(vehicle)) throw new FullParkingSlotsError(vehicle.type);

        if(this.vehicles.find(veh => veh.id === vehicle.id)) throw new VehicleAlreadyInTheCompanyError();

        this.vehicles.push(vehicle);
    }


    hasParkingSlots(vehicle: Vehicle): boolean {
        if(vehicle.type === VehiclesTypes.BIKE){
            const numBikes = this.vehicles.filter(bike => bike.type === VehiclesTypes.BIKE).length;
            return this.bikeParkingAmount > numBikes;
        }
        
        if(vehicle.type === VehiclesTypes.CAR){
            const numCars = this.vehicles.filter(car => car.type === VehiclesTypes.CAR).length;
            return this.carParkingAmount > numCars;
        }
        throw new Error('Invalid Vehicle Type!');
    }

}
