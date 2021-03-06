import { Router } from "express";
import appointmentsRouter from "./appointments.routes";

const routes = Router();

// Use serve para qualquer tipo de rota.
routes.use("/appointments", appointmentsRouter);

export default routes;
