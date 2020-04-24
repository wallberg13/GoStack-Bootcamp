import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/**
 * StrictMode:
 * -> Verificação a mais nas tratativas de erros
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
