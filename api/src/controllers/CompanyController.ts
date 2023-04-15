import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../services/exceptions/ValidationError";
import CompanyService from "../services/CompanyService";
// import { autoInjectable } from "tsyringe";

// @autoInjectable()
export default class CompanyController {
    // service: CompanyService;

    // constructor(service: CompanyService) {
    //     this.service = service;
    // }

    async createCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const service = new CompanyService();
            const company: CreateCompanyRequest = req.body;

            validateCompanyRequest(company);
            
            const result = await service.createCompany(company);
    
            return res.json(result);
        } catch(err) {
            next(err);
        }
    }

    async getAllCompanies(_, res: Response, next: NextFunction) {
        try {
            const service = new CompanyService();
            const companies = await service.getAllCompanies();
            return res.json(companies);
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
    
    console.log('Passou tudo!');
    if(validationErrors.length > 0) {
        throw new ValidationError(validationErrors);
    }
}