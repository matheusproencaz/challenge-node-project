import { getRepository } from "typeorm";
import { Company } from "../entities/Company";
import { CompanyAlreadyExistsError } from "./exceptions/CompanyAlreadyExistsError";
// import { autoInjectable } from "tsyringe";

// @autoInjectable()
export default class CompanyService {
    async createCompany({ 
        name, 
        cnpj, 
        address, 
        phone,
        bikeParkingAmount,
        carParkingAmount
    }: CreateCompanyRequest): Promise<Company> {

        const repository = getRepository(Company);

        if(await repository.findOne({cnpj})) {
            throw new CompanyAlreadyExistsError();
        }

        const company = repository.create({
            name,
            cnpj,
            address,
            phone,
            bikeParkingAmount,
            carParkingAmount
        })

        await repository.save(company);

        return company;
    }

    async getAllCompanies() {
        const repository = getRepository(Company);
        return await repository.find();
    }
}

