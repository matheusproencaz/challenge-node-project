import { Router } from "express";
import CompanyController from "../controllers/CompanyController";

const routes = Router();

routes.get('/', new CompanyController().getAllCompanies);
routes.get('/:id', new CompanyController().getCompanyById);
routes.post('/', new CompanyController().createCompany);
routes.delete('/:id', new CompanyController().deleteCompanyById);
routes.put('/:id', new CompanyController().updateCompany);
routes.put('/:idCompany/:idVehicle', new CompanyController().addVehicleToCompany);

export default routes;