import { Router } from "express";
import SessionsController from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();
// Rota completa: http://localhost:3333/sessions/
sessionsRouter.post("/", sessionsController.create);

export default sessionsRouter;
