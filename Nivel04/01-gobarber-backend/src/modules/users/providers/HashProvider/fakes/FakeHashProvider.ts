import IHashProvider from "../models/IHashProvider";

export default class FakeHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return new Promise(resolve => resolve(payload));
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return new Promise(resolve => resolve(payload === hashed));
  }
}
