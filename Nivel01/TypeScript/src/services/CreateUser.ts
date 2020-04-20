/**
 * Para criar: name, email, password
 */

interface TechObject {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: string; // Opcional
  email: string;
  password: string; // Tipagem de Variaveis
  techs: Array<string | TechObject>; // Tipagem Variável
}

export default function createUser({
  name = "",
  email,
  password,
}: CreateUserData) {
  const user = {
    name,
    email,
    password,
  };

  return user;
}
