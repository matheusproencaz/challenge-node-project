import { Response, Router } from "express";

const routes = Router();

routes.get("/health", (_, res: Response) => res.json("It's UP!"));


export { routes };
