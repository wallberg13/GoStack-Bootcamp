import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/global";
import Routes from "./routes";

/**
 * AuthContext.Provider
 * -> Diz que todo mundo que está por volta dele, vai ter acesso a informação de autenticação.
 */
import AppProvider from "./hooks";

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  </>
);

export default App;
