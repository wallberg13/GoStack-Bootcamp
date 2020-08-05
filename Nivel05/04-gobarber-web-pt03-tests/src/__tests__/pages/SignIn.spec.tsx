import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SignIn from "../../pages/SignIn";

// Variavel visivel para todos os testes. Nela, é possivel ver
// se uma função foi chamada, por exemplo
const mockedHistoryPush = jest.fn();

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

describe("SignIn Page", () => {
  it("should be able to sign in", () => {
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
    expect(mockedHistoryPush).toHaveBeenCalledWith("/dashboard");
  });
});
