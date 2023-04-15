import { Repository } from "typeorm";
import { Vehicle } from "../entities/Vehicle";
import { VehicleAlreadyExistsError } from "./exceptions/VehicleAlreadyExistsErro";
import { VehicleDoesNotExistsError } from "./exceptions/VehicleDoesNotExistsError";
import { CreateVehicleRequest } from "../types/CreateVehicleRequest";
import { UpdateVehicleRequest } from "../types/UpdateVehicleRequest";

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

    async getAllVehicles(): Promise<Vehicle[]> {
        return await this.repository.find();
    }

    async getVehicleById(id: string): Promise<Vehicle> {
        const vehicle = await this.repository.findOne(id);
        
        if(!vehicle) throw new VehicleDoesNotExistsError();

        return vehicle;
    }

    async deleteVehicleById(id: string): Promise<void> {
        const vehicle = await this.getVehicleById(id);
        await this.repository.delete(vehicle);
    }

    async updatevehicleById(id: string, { brand, color, plate }: UpdateVehicleRequest) {
        const vehicle = await this.getVehicleById(id);

        vehicle.brand = brand ? brand : vehicle.brand;
        vehicle.color = color ? color : vehicle.color;
        vehicle.plate = plate ? plate : vehicle.plate;

        await this.repository.save(vehicle);

        return vehicle;
    }

}