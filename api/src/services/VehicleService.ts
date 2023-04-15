import { Repository } from "typeorm";
import { Vehicle } from "../entities/Vehicle";
import { CreateVehicleRequest } from "../types/CreateVehicleRequest";
import { VehicleAlreadyExistsError } from "./exceptions/VehicleAlreadyExistsErro";

export default class VehicleService {

    repository: Repository<Vehicle>;

    constructor(repository: Repository<Vehicle>) {
        this.repository = repository;
    }

    async createVehicle({
        brand,
        color,
        plate,
        type
    }: CreateVehicleRequest): Promise<Vehicle> {

        if(await this.repository.findOne({plate})) {
            throw new VehicleAlreadyExistsError();
        }

        const vehicle = this.repository.create({
            brand,
            color,
            plate,
            type
        });

        await this.repository.save(vehicle);

        return vehicle;
    }

    async getAllVehicles() {
        return await this.repository.find();
    }

}