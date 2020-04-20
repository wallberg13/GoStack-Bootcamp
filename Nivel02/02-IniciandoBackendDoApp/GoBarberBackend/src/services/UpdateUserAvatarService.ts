import path from "path";
import { getRepository } from "typeorm";
import fs from "fs";

import uploadConfig from "../config/upload";
import User from "../models/User";

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        id: user_id
      }
    });

    if (!user) {
      throw new Error("Only authenticated users can change avatar.");
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
    await usersRepository.save(user); // Atualizando o usuário.

    return user;
  }
}

export default UpdateUserAvatarService;
