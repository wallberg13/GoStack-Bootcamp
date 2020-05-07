import React from "react";
import SignIn from "./pages/SignIn";
import GlobalStyle from "./styles/global";

/**
 * AuthContext.Provider
 * -> Diz que todo mundo que está por volta dele, vai ter acesso a informação de autenticação.
 */
import { AuthProvider } from "./hooks/AuthContext";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  </>
);

export default App;
