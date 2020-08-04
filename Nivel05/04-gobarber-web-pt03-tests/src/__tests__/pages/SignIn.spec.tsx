import React from "react";
import { render } from "@testing-library/react";
import SignIn from "../../pages/SignIn";

jest.mock("react-router-dom", () => {
  return {
    useHistory: jest.fn(), // Jest.fn() é uma função vazia, que não faz nada.
    Link: ({ children }: { children: React.ReactNode }) => children
  };
});

describe("SignIn Page", () => {
  it("should be able to sign in", () => {
    const { debug } = render(<SignIn />);

    debug();
  });
});
