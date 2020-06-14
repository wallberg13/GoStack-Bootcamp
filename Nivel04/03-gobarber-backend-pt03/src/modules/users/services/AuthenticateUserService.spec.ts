import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

// Vamos precisar utilizar um outro service, para criar o usuário antes dele autenticar
// Isso nao deveria acontecer, pois estamos fazendo testes unitários e não testes de integração,
// mas isso será melhorado
describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able to authenticate", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123456"
    });

    // qual resultado estou esperando?
    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non existing user", async () => {
    await expect(
      authenticateUser.execute({
        email: "johndoex@example.com",
        password: "123456"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    // qual resultado estou esperando?
    await expect(
      authenticateUser.execute({
        email: "johndoe@example.com",
        password: "wrong-password"
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
