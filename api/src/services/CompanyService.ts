import { Repository } from "typeorm";
import { Company } from "../entities/Company";
import { CompanyAlreadyExistsError } from "./exceptions/CompanyAlreadyExistsError";
import { CompanyDoesNotExistsError } from "./exceptions/CompanyDoesNotExistsError";
import { Vehicle } from "../entities/Vehicle";

export default class CompanyService {

    constructor(private repository: Repository<Company>, private vehicleRepository?: Repository<Vehicle>) {
    }
    
    async createCompany({ 
        name, 
        cnpj, 
        address, 
        phone,
        bikeParkingAmount,
        carParkingAmount
    }: CreateCompanyRequest): Promise<Company> {
        if(await this.repository.findOne({cnpj})) {
            throw new CompanyAlreadyExistsError();
        }

        const company = this.repository.create({
            name,
            cnpj,
            address,
            phone,
            bikeParkingAmount,
            carParkingAmount
        })

        await this.repository.save(company);

        return company;
    }

    async getAllCompanies(): Promise<Company[]> {
        return await this.repository
            .createQueryBuilder("company")
            .leftJoinAndSelect("company.vehicles", "vehicles")
            .getMany();
    }

    async findCompanyById(id: string): Promise<Company> {
        // const company  = await this.repository.findOne(id);
        const company  = await this.repository
            .createQueryBuilder("company")
            .where({id})
            .leftJoinAndSelect("company.vehicles", "vehicles")
            .getOne();

        if(!company) throw new CompanyDoesNotExistsError();

        return company;
    }

    async deleteCompanyById(id: string): Promise<void> {
        if(!await this.repository.findOne(id)) {
            throw new CompanyDoesNotExistsError();
        }
        this.repository.delete(id);
    }

    async updateCompanyById(id: string, {
        name, 
        cnpj, 
        address, 
        phone,
        bikeParkingAmount,
        carParkingAmount
    }: UpdateCompanyRequest): Promise<Company> {
        const company = await this.repository.findOne(id);
        
        if(!company) {
            throw new CompanyDoesNotExistsError();
        }
        
        if(await this.repository.findOne({cnpj})) {
            throw new CompanyAlreadyExistsError();
        }
        
        company.cnpj = cnpj ? cnpj : company.cnpj;
        company.name = name ? name : company.name;
        company.address = address ? address : company.address;
        company.phone = phone ? phone : company.phone;
        company.bikeParkingAmount = bikeParkingAmount ? bikeParkingAmount : company.bikeParkingAmount;
        company.carParkingAmount = carParkingAmount ? carParkingAmount : company.carParkingAmount;

        await this.repository.save(company);

        return company;
    }

    async addVehicleToCompany(idCompany: string, idVehicle): Promise<Company> {
        
        const company = await this.findCompanyById(idCompany);
        const vehicle = await this.vehicleRepository.findOne({id: idVehicle});

        if(!company) throw new CompanyDoesNotExistsError();

        company.addVehicle(vehicle);

        await this.repository.save(company);

        return company;
    }
}

