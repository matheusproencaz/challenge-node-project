import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Vehicle, VehiclesTypes } from "../entities/Vehicle";
import VehicleService from "../services/VehicleService";
import { CreateVehicleRequest } from "../types/CreateVehicleRequest";
import { ValidationError } from "../services/exceptions/ValidationError";
import { Car } from "../entities/Car";
import { Bike } from "../entities/Bike";


export default class VehicleController {

    async createVehicle(req: Request, res: Response, next: NextFunction) {
        try {
            const vehicle: CreateVehicleRequest = req.body;
     
            validateVehicleRequest(vehicle);

            let repository;

            if(vehicle.type === VehiclesTypes.CAR) {
                repository = getRepository(Car);
            }

            if(vehicle.type === VehiclesTypes.BIKE) {
                repository = getRepository(Bike);
            }

            const service = new VehicleService(repository);

            const result = await service.createVehicle(vehicle);

            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getAllVehicles(_, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Vehicle);
            const service = new VehicleService(repository);

            const result = await service.getAllVehicles();

            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getAllCars(_, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Car);
            const service = new VehicleService(repository);

            const result = await service.getAllVehicles();

            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getAllBikes(_, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Bike);
            const service = new VehicleService(repository);

            const result = await service.getAllVehicles();

            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

function validateVehicleRequest({
    brand, 
    color, 
    plate, 
    type
}: CreateVehicleRequest): void {
    const validationErrors: string[] = [];
    
    if(!brand) validationErrors.push('brand is null!');
    if(!color)  validationErrors.push('color is null!');
    if(!plate) validationErrors.push('plate is null!');
    if(!type) validationErrors.push('type is null!');

    if(!Object.values(VehiclesTypes).includes(type)) {
        validationErrors.push('Invalid Vehicle Type!');
    }

    if(validationErrors.length > 0) {
        throw new ValidationError(validationErrors);
    }
}