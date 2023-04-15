import { Router } from "express";
import VehicleController from "../controllers/VehicleController";

const routes = Router();

routes.get('/', new VehicleController().getAllVehicles);
routes.get('/cars', new VehicleController().getAllCars);
routes.get('/bikes', new VehicleController().getAllBikes);
routes.post('/', new VehicleController().createVehicle);

export default routes;