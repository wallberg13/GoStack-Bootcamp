import React from "react";

import Input from "../../components/Input";
import { render, fireEvent, wait } from "@testing-library/react";

jest.mock("@unform/core", () => {
  return {
    useField() {
      return {
        fieldName: "email",
        defaultValue: "",
        error: "",
        registerField: jest.fn()
      };
    }
  };
});

describe("Input Component", () => {
  it("should be able to rander an input", () => {
    // Renderizando  componente
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );
    // Esquerando que quando eu renderizar o componente, o mesmo possua retorno,
    // e que este retorno seja verdadeiro.
    expect(getByPlaceholderText("E-mail")).toBeTruthy();
  });

  it("should render highlight on input focus", async () => {
    const { getByPlaceholderText, getByTestId, debug } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText("E-mail");
    const containerElement = getByTestId("input-container");

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle("border-color: #ff9000;");
      expect(containerElement).toHaveStyle("color: #ff9000;");
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle("border-color: #ff9000;");
      expect(containerElement).not.toHaveStyle("color: #ff9000;");
    });
  });

  /**
   * Garantindo que quando o usuário preenche o input, o mesmo mantenha a borda
   * preenchida pela a cor da aplicação.
   */
  it("should keep input border highlight when input filled", async () => {
    const { getByPlaceholderText, getByTestId, debug } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText("E-mail");
    const containerElement = getByTestId("input-container");

    fireEvent.change(inputElement, {
      target: {
        value: "johndoe@example.com.br"
      }
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle("color: #ff9000;");
    });
  });
});
