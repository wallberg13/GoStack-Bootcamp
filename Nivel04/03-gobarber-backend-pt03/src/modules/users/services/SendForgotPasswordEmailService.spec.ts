// import AppError from "@shared/errors/AppError";

import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";

import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmail", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    await sendForgotPasswordEmailService.execute({
      email: "johndoe@example.com"
    });

    // qual resultado estou esperando?
    expect(sendMail).toBeCalled();
  });

  it("should not be able to recover a non-existing user password", async () => {
    // qual resultado estou esperando?
    await expect(
      sendForgotPasswordEmailService.execute({
        email: "johndoe@example.com"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  // Testando se quando fazemos a geração de senha valida, ele gera o nosso token
  it("should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, "generate");

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    await sendForgotPasswordEmailService.execute({
      email: "johndoe@example.com"
    });

    // qual resultado estou esperando?
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

// RED
// GREEN - Não da melhor forma possível
// REFACTOR
