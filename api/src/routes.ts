import { Response, Router } from 'express';
import CompanyController from './controllers/CompanyController';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import { Company } from './entities/Company';
import CompanyService from './services/CompanyService';

const routes = Router();

routes.get('/health', (_, res: Response) => res.json("It's UP!"));

routes.get('/companies', new CompanyController().getAllCompanies);

routes.post('/companies', new CompanyController().createCompany);
// routes.get('/companies', container.resolve(CompanyController).getAllCompanies);
// routes.post('/companies', container.resolve(CompanyController).createCompany);


export { routes };
