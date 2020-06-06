import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const profileRouter = Router();
const profileController = new ProfileController();

// usuário sempre logado
profileRouter.use(ensureAuthenticated);

// Obtendo o perfil do usuário
profileRouter.get("/", profileController.show);

// Rota completa: http://localhost:3333/profile/
profileRouter.put("/", profileController.update);

export default profileRouter;
