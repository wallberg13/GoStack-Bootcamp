import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import GlobalStyle from "./styles/global";

/**
 * No React Router DOM, possuimos alguns tipos de Routes.
 * Como o BrowserRouter, que funciona como um endereço em cima do Browser.
 *
 * -> Para que server uma Hashrouter
 *    -> Serve para SPA, hoje, serve mais para BrowserRouter
 */
const App: React.FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
);

export default App;
