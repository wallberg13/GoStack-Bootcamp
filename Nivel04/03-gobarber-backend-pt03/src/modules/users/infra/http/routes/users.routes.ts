import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import multer from "multer";

import uploadConfig from "@config/upload";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

/**
 * Repositoriese
 * Services
 */

// Rota completa: http://localhost:3333/appointments/
userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
);

/**
 * Alterando somente uma informação.
 */

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default userRouter;
