import AppError from "@shared/errors/AppError";

import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe("UpdateUserAvatar", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
  });

  it("should be able to update a user avatar", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.png"
    });

    expect(user.avatar).toBe("avatar.png");
  });

  it("should not be able to update avatar avatar to non existing user", async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: "non-existing-user",
        avatarFilename: "avatar.png"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old avatar when updating new one", async () => {
    /**
     * O Jest.spyOn consegue saber quando que a função foi disparada, a
     * mesma que passei para o deleteFile.
     * Como saber se a função foi executada?
     */
    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar.png"
    });

    // spy - espinar - Vamos espionar se uma função foi executada

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: "avatar2.png"
    });

    // Espero que a função de deletar avatar tenha sido chamado com "avatar.png"
    expect(deleteFile).toHaveBeenCalledWith("avatar.png");
    expect(user.avatar).toBe("avatar2.png");
  });
});
