import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import ProfileController from "../controllers/ProfileController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const profileRouter = Router();
const profileController = new ProfileController();

// usuário sempre logado
profileRouter.use(ensureAuthenticated);

// Obtendo o perfil do usuário
profileRouter.get("/", profileController.show);

// Rota completa: http://localhost:3333/profile/
profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref("password"))
    }
  }),
  profileController.update
);

export default profileRouter;
