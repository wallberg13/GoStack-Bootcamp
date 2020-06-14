import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

/**
 * Seguindo a metodologia do REST, deve possuir apenas 5 métodos, são eles:
 * index, show, create, update, delete
 */
export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticteUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticteUser.execute({
      email,
      password
    });

    delete user.password;

    return response.json({ user, token });
  }
}
