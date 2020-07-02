import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateProfileService from "./UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able to update the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tree",
      email: "johntree@example.com"
    });

    expect(updatedUser.name).toBe("John Tree");
    expect(updatedUser.email).toBe("johntree@example.com");
  });

  it("should not be able to update the profile to non-existing user", async () => {
    await expect(
      updateProfile.execute({
        user_id: "non-unexists-user",
        name: "John Tree",
        email: "johntree@example.com"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to change to another user email", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    const user = await fakeUsersRepository.create({
      name: "Teste",
      email: "test@example.com",
      password: "123456"
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Tree",
        email: "johndoe@example.com"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  // Caso teste que ele consiga atualizar a senha
  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tree",
      email: "johntree@example.com",
      old_password: "123456",
      password: "123123"
    });

    expect(updatedUser.password).toBe("123123");
  });

  // Caso teste que ele não consiga atualizar a senha sem fornecer a senha antiga
  it("should not be able to update the password without old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Tree",
        email: "johntree@example.com",
        password: "123123"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  // O usuario não deve atualizar a sua senha caso a senha antiga fornecida seja errada.
  it("should not be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Tree",
        email: "johntree@example.com",
        old_password: "wrong-old-password",
        password: "123123"
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
