import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import ResetPasswordService from "./ResetPasswordService";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe("ResetPasswordService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  // Garantindo que a nossa senha possa ser resetada
  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPassword.execute({ token, password: "123123" });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });

  // Garantindo que seja impossível resetar a senha com um token que não existe
  it("should not be able to reset the password with non-existing token", async () => {
    await expect(
      resetPassword.execute({ token: "non-existing-token", password: "123456" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password with non-existing user", async () => {
    const { token } = await fakeUserTokensRepository.generate(
      "non-existing-user"
    );
    await expect(
      resetPassword.execute({ token, password: "123456" })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset the password if passed more than 2 hours", async () => {
    // mock -> é alem do spy, pq alem de espionar a função, vamos dizer que uma várivel dentro
    // de tal função é no valor que nós desejamos.
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const { token } = await fakeUserTokensRepository.generate(user.id);

    // Aqui, o Jest está fazendo uma malandragem, com a chamada do mockImplementationOnce, que basicamente, ele está dizendo:
    // "Quando eu for chamar essa função, ao invés de executá-la, irei executar outra função."
    // Sendo assim, vamos poder fazer o comportamento de avançar no futuro xD
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ password: "123123", token })
    ).rejects.toBeInstanceOf(AppError);
  });
});

// Hash
// 2h expiração
// userToken inexistente
// user inexistente
