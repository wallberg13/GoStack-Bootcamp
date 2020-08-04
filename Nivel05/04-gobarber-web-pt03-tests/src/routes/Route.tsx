import React from "react";
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect
} from "react-router-dom";
import { useAuth } from "../hooks/auth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // Recebendo um tipo de componente por propriedade
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  /**
   * A prop render serve para:
   * -> Essa propriedade possui como "parâmetro" uma função que
   * diz qual será a forma de mostrar o componente em tela.
   * É neste ponto que definos para onde o usuário vai caso uma condição da
   * rota não for atendida.
   */
  return (
    <ReactDOMRoute
      {...rest}
      // Para garantir que o nosso histórico não fique perdido, colocamos o location.
      render={({ location }) => {
        // Se rota privada e não está logado
        // Se a rota é publica e usuário está logado
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default Route;
