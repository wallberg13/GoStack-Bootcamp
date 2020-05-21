import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";
import authConfig from "@config/auth";

import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticationUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    // user.password - Senha criptografada
    // password - Senha não-criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    /**
     * Primeiro parâmetro: payload, informações não seguras, onde qualquer um
     * pode descriptografar.
     * Segundo parâmetro: um secrets, ou uma chave única (gero um md5 qualquer : d721dc042dab475b1808ac02a65af0a6)
     * Tercerio Parâmetro: configurações do token.
     */

    const { secret, expiresIn } = authConfig.jwt;

    // Experiência / segurança
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {
      user,
      token
    };
  }
}

export default AuthenticationUserService;
