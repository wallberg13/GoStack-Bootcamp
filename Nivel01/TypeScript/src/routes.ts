import { Request, Response } from "express";
import createUser from "./services/CreateUser";
/**
 * Adicionando Tipagem.
 * => OLTZ tem TypeScript?
 */
export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: "Caralho",
    email: "De",
    password: "Aza",
    techs: ["Caralho", "De", "Aza", { title: "Bucetinha", experience: 123 }],
  });
  return response.json({ message: "Hello World", user });
}
