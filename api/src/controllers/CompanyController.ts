import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../services/exceptions/ValidationError";
import CompanyService from "../services/CompanyService";
import { getRepository } from "typeorm";
import { Company } from "../entities/Company";
import { Vehicle } from "../entities/Vehicle";


export default class CompanyController {

    async createCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Company);
            const service = new CompanyService(repository);

            validateCompanyRequest(req.body);
            const company: CreateCompanyRequest = req.body;
            
            const result = await service.createCompany(company);
    
            return res.json(result);
        } catch(err) {
            next(err);
        }
    }

    async getAllCompanies(_, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Company);
            const service = new CompanyService(repository);

            const result = await service.getAllCompanies();
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getCompanyById(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Company);
            const service = new CompanyService(repository);
            
            const { id } = req.params;

            const result = await service.findCompanyById(id);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteCompanyById(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Company);
            const service = new CompanyService(repository);
            
            const { id } = req.params;
            await service.deleteCompanyById(id);

            return res.status(204).end();
        } catch (err) {
            next(err);
        }
    }

    async updateCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Company);
            const service = new CompanyService(repository);

            const { id } = req.params;
            // const { name, cnpj, address, phone, bikeParkingAmount, carParkingAmount }: CreateCompanyRequest = req.body;
            const companyRequest: CreateCompanyRequest = req.body;

            const result = await service.updateCompanyById(id, companyRequest);

            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async addVehicleToCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Company);
            const vehicleRepository = getRepository(Vehicle);
            const service = new CompanyService(repository, vehicleRepository);

            const { idCompany, idVehicle } = req.params;

            const result = await service.addVehicleToCompany(idCompany, idVehicle);

            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async removeVehicleToCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const repository = getRepository(Company);
            const vehicleRepository = getRepository(Vehicle);
            const service = new CompanyService(repository, vehicleRepository);

            const { idCompany, idVehicle } = req.params;

            const result = await service.removeVehicleToCompany(idCompany, idVehicle);

            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

}

function validateCompanyRequest({
    name, 
    cnpj, 
    address, 
    phone,
    bikeParkingAmount,
    carParkingAmount
}: CreateCompanyRequest): void {
    const validationErrors: string[] = [];
    
    if(!name) validationErrors.push('Name is null!');
    if(!cnpj)  validationErrors.push('Cnpj is null!');
    if(!address) validationErrors.push('Address is null!');
    if(!phone) validationErrors.push('Phone is null!');
    if(!bikeParkingAmount) validationErrors.push('BikeParkingAmount is null!');
    if(!carParkingAmount) validationErrors.push('CarParkingAmount is null!');
    
    if(validationErrors.length > 0) {
        throw new ValidationError(validationErrors);
    }
}