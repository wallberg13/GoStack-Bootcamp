import { createContext } from "react";

/**
 * API de Contexto
 * -> Possui como objetivo, compartilhar informações entre componentes de diferentes
 *    arvores de elementos (basicamente, entre contextos diferentes). É uma fonte da verdade.
 */
interface AuthContextData {
  name: string;
}

// Burlando a inicialização do contexto com um objeto vazio.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
