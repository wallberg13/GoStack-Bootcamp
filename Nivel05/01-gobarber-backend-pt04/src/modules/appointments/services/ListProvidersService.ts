// import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { classToClass } from "class-transformer";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    // Dizendo que o carinha que estou usando aqui foi injetado de algum lugar.
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      });

      // ":" no redis é como se fosse um nível a mais de cache.
      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users)
      );
    }

    return users;
  }
}

export default ListProvidersService;
