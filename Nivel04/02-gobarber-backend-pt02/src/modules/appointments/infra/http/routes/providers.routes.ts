import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import ProvidersController from "../controllers/ProvidersController";
import ProvidersDayAvailabilityController from "../controllers/ProviderDayAvailabilityController";
import ProvidersMonthAvailabilityController from "../controllers/ProviderMonthAvailabilityController";

const providersRouter = Router();
const providersController = new ProvidersController();
const providersMonthAvailabilityController = new ProvidersMonthAvailabilityController();
const providersDayAvailabilityController = new ProvidersDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

// Rota completa: http://localhost:3333/providers/
providersRouter.get("/", providersController.index);

providersRouter.get(
  "/:provider_id/month-availability",
  providersMonthAvailabilityController.index
);
providersRouter.get(
  "/:provider_id/day-availability",
  providersDayAvailabilityController.index
);

export default providersRouter;
