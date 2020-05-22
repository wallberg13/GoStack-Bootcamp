import path from "path";
import { inject, injectable } from "tsyringe";
import fs from "fs";

import AppError from "@shared/errors/AppError";

import uploadConfig from "@config/upload";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    // Dizendo que o carinha que estou usando aqui foi injetado de algum lugar.
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    }

    /**
     * Se o usuário já possuia um avatar, então o mesmo será deletado.
     */
    if (user.avatar) {
      // Obtendo o path do arquivo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Verificando se o mesmo existe ou não
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // Se o arquivo existir, então o mesmo será excluido
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    /**
     * Como atualizar a informação?
     */
    user.avatar = avatarFilename; // Como o usuário já tem um ID, o save só atualiza
    await this.usersRepository.save(user); // Atualizando o usuário.

    return user;
  }
}

export default UpdateUserAvatarService;
