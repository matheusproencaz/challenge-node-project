import { Response, Router } from 'express';
import CompanyRoutes from './company.routes';
const routes = Router();

routes.get('/health', (_, res: Response) => res.json("It's UP!"));
routes.use('/companies', CompanyRoutes);

export { routes };
