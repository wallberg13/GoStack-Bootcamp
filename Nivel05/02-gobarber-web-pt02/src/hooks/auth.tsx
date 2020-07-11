import React, { createContext, useCallback, useState, useContext } from "react";

import api from "../services/api";

/**
 * API de Contexto
 * -> Possui como objetivo, compartilhar informações entre componentes de diferentes
 *    arvores de elementos (basicamente, entre contextos diferentes). É uma fonte da verdade.
 */

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

// Burlando a inicialização do contexto com um objeto vazio.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * Para deixar claro, os contextos são as primeiras coisas que serão renderizadas.
 * Qualquer alteração nos contextos faz com que a aplicação seja renderizada novamente.
 * @param param0
 */
export const AuthProvider: React.FC = ({ children }) => {
  /**
   * Inicializando um estado por meio de função.
   * Ou inicializa com o que tem no localstorage (para não precisar utilizar o mesmo em
   * todo quando é de lugar), ou inicializa vazio, forçando o tipo do objeto de saída.
   */
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@GoBarber:token");
    const user = localStorage.getItem("@GoBarber:user");

    if (token && user) {
      // Executado quando o usuário faz o refresh da página
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", { email, password });

    const { token, user } = response.data;

    localStorage.setItem("@GoBarber:token", token);
    localStorage.setItem("@GoBarber:user", JSON.stringify(user));

    // Executado quando o usuário vai fazer o login
    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  /**
   * Para fazer o logout, basta pegar o localstorage que possui as nossas credenciais de
   * acesso, e remover somente OS ITENS DA NOSSA APLICAÇÃO.
   * Poderiamos muito bem, ter feito somente um localStorage.clean, entretanto, isso
   * apagaria todo o storage das aplicações testadas no nosso dispositivo.
   */
  const signOut = useCallback(() => {
    localStorage.removeItem("@GoBarber:token");
    localStorage.removeItem("@GoBarber:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Como funciona:
 * -> Se usar o hook sem está por dentro do contexto, então ele vai dá erro,
 *    pois o mesmo só será criado com o contexto criado.
 */
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
