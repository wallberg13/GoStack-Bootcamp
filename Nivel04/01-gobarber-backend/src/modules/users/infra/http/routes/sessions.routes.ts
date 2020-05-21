import { Router } from "express";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

const sessionsRouter = Router();

// Rota completa: http://localhost:3333/sessions/
sessionsRouter.post("/", async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;

  const authenticteUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticteUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
