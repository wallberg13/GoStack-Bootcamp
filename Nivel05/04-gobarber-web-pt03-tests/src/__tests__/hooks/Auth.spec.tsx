import { renderHook } from "@testing-library/react-hooks";
import { useAuth, AuthProvider } from "../../hooks/auth";
import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";

// Mockando a API
const apiMock = new MockAdapter(api);

describe("Auth hook", () => {
  it("should be able to sign in", async () => {
    const apiResponse = {
      user: {
        id: "user123",
        name: "John Doe",
        email: "johndoe@example.com.br"
      },
      token: "token-123"
    };

    apiMock.onPost("sessions").reply(200, apiResponse);

    // no fundo no fundo, o localStorage não existe, e ele é apenas
    // um alias (var localStorage: Storage).
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    // Wrapper: componente que ficará por volta do nosso Hook, que é o AuthProvider.
    // waitForNextUpdate: aguardando que algum estado mude no hook
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    result.current.signIn({
      email: "johndoe@example.com.br",
      password: "123456"
    });

    await waitForNextUpdate();

    // Validando se o storage está ok!
    expect(setItemSpy).toHaveBeenCalledWith(
      "@GoBarber:token",
      apiResponse.token
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      "@GoBarber:user",
      JSON.stringify(apiResponse.user)
    );
    expect(result.current.user.email).toEqual("johndoe@example.com.br");
  });
});
