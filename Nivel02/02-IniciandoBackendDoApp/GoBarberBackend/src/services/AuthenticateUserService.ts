import { getRepository } from "typeorm";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import User from "../models/User";
import authConfig from "../config/auth";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticationUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error("Incorrect email/password combination.");
    }

    // user.password - Senha criptografada
    // password - Senha não-criptografada
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error("Incorrect email/password combination.");
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
