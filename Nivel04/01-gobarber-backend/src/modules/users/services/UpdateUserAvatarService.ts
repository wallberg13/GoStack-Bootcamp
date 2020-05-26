import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
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
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
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
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);
    /**
     * Como atualizar a informação?
     */
    user.avatar = filename; // Como o usuário já tem um ID, o save só atualiza
    await this.usersRepository.save(user); // Atualizando o usuário.

    return user;
  }
}

export default UpdateUserAvatarService;
