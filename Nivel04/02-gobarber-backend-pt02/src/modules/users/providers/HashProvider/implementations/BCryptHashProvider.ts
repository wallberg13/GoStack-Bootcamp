import { hash, compare } from "bcrypt";
import IHashProvider from "../models/IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashStr = await hash(payload, 8);
    return hashStr;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const isEqual = await compare(payload, hashed);
    return isEqual;
  }
}
