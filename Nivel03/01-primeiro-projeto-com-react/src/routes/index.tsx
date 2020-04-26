import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";
import NotFound from "../pages/NotFound";

/**
 * Path: qual endereço que devo colocar na página da Raiz.
 *
 * Component: qual elemento será mostrado em tela.
 *
 * Dentro do App, é necessário mostrar as rotas.
 *
 * O Switch garante que somente uma rota seja exibida em tela, e não
 * todos os componentes.
 */
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repository" exact component={Repository} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
