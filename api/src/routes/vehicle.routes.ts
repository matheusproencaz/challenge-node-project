import { Router } from "express";
import VehicleController from "../controllers/VehicleController";

const routes = Router();

routes.get('/', new VehicleController().getAllVehicles);
routes.get('/cars', new VehicleController().getAllCars);
routes.get('/bikes', new VehicleController().getAllBikes);
routes.get('/:id', new VehicleController().getVehicleByID);
routes.post('/', new VehicleController().createVehicle);
routes.put('/:id', new VehicleController().updateVehicleById);
routes.delete('/:id', new VehicleController().deleteVehicleByID);

export default routes;