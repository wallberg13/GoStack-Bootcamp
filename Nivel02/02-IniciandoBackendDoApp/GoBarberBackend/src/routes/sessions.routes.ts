import { Router } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

// Rota completa: http://localhost:3333/sessions/
sessionsRouter.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticteUser = new AuthenticateUserService();

    const { user, token } = await authenticteUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
