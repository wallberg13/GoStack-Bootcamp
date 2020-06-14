import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Controllers serve para abstrair a logica das nossas rotas.

// Adicionando o Middleware em todas as rotas do appointments
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

// Rota completa: http://localhost:3333/appointments/
appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;
