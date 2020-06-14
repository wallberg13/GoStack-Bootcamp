// import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    // Dizendo que o carinha que estou usando aqui foi injetado de algum lugar.
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found!");
    }

    return user;
  }
}

export default ShowProfileService;
