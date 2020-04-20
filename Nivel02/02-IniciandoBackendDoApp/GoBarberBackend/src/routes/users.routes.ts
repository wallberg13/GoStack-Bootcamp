import { Router } from "express";
import CreateUserService from "../services/CreateUserService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userRouter = Router();
/**
 * Repositoriese
 * Services
 */

// Rota completa: http://localhost:3333/appointments/
userRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

/**
 * Alterando somente uma informação.
 */
userRouter.patch("/avatar", ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});

export default userRouter;
