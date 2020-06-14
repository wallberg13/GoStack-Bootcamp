import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// Controllers serve para abstrair a logica das nossas rotas.

// Adicionando o Middleware em todas as rotas do appointments
appointmentsRouter.use(ensureAuthenticated);

// Rota completa: http://localhost:3333/appointments/
appointmentsRouter.post("/", appointmentsController.create);

appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;
