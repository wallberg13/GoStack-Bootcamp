// import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

// import User from "../infra/typeorm/entities/User";
// import AppError from "@shared/errors/AppError";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    // Dizendo que o carinha que estou usando aqui foi injetado de algum lugar.
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  // public async execute({ email }: IRequest): Promise<void> {}
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    // Incialmente, verificando se o token existe
    if (!userToken) {
      throw new AppError("User token does not exists");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    // Verificando se o usuario existe, que é o dono do token.
    if (!user) {
      throw new AppError("User does not exists");
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
