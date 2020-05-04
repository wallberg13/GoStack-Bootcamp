import React from "react";
import SignIn from "./pages/SignIn";
import GlobalStyle from "./styles/global";

/**
 * AuthContext.Provider
 * -> Diz que todo mundo que está por volta dele, vai ter acesso a informação de autenticação.
 */
import AuthContext from "./context/AuthContext";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthContext.Provider value={{ name: "Wall Morais" }}>
      <SignIn />
    </AuthContext.Provider>
  </>
);

export default App;
