import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

/**
 * A autenticação das rotas devem ser verificadas no arquivo de rotas,
 * ou seja, antes da página ser renderizada.
 *
 * Basicamente, para evitar que a o componente seja renderizado quando o usuário
 * possuir intenções de ir para a mesma, o Route vai fazer com que o usuário volte
 * para a página publica principal (e neste, ele nem faz verificação para saber
 * se a chave é valida, ele faz tudo no front sem perguntar para o back, muito estranho
 * isto).
 */

const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/Dashboard" exact component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Router;
