import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import SignIn from "../../pages/SignIn";

// Variavel visivel para todos os testes. Nela, é possivel ver
// se uma função foi chamada, por exemplo
const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    // A partir do momento que o usuário chamar a função useHistory,
    // ela vai retornar um objeto, onde um dos elementos é a função 'push';
    useHistory: () => ({
      push: mockedHistoryPush
    }), // Jest.fn() é uma função vazia, que não faz nada.
    Link: ({ children }: { children: React.ReactNode }) => children
  };
});

jest.mock("../../hooks/auth", () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn
    })
  };
});

jest.mock("../../hooks/toast", () => {
  return {
    useToast: () => ({
      // Criando um erro ficticio
      addToast: mockedAddToast
    })
  };
});

describe("SignIn Page", () => {
  // Disparando uma função antes de cada um dos testes
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it("should be able to sign in", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    // FireEvent faz a ação de gerar um evento para tal elemento.
    // O elemento é passado como parâmetro. E para simular qual valor do nosso target
    // que seria passado para o nosso evento, nós adicionamos este valor que simula o que
    // o evento envia para no onChange.
    fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    // Simulando o evento de click
    fireEvent.click(buttonElement);

    // O teste precisa assegurar que após o usuário clicar no botão Submit,
    // o usuário possa ser redirecionado para a página de `/dashboard`.
    // wait -> ele espera até dá certo!!
    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should not be able to sign in with invalid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, {
      target: { value: "not-valid-email" }
    });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it("should display an error if login fails", async () => {
    // MockImplementation serve para rescrever um mock que já mockou outra coisa.
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText("E-mail");
    const passwordField = getByPlaceholderText("Senha");
    const buttonElement = getByText("Entrar");

    fireEvent.change(emailField, {
      target: { value: "wall@gmail.com" }
    });
    fireEvent.change(passwordField, { target: { value: "123456" } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error" })
      );
    });
  });
});
