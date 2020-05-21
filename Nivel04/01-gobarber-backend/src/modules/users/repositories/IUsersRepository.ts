import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

// Encontrar por email - FindByEmail
// Encontrar por id - FindByID
// Create
// save

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
