import React from "react";
import { useRouteMatch } from "react-router-dom";

interface RepositoryParams {
  repository: string;
}

/**
 * Por que utilizar no formato de constante:
 * - Pq é mais simples definir a tipagem do componente.
 *
 * O Tipo React.FC é de: React Function
 */
const Repository: React.FC = () => {
  /**
   * O use route match serve para pegar os parâmetros passados
   * de uma rota para outra.
   */
  const { params } = useRouteMatch<RepositoryParams>();

  return <h1>Repository:{params.repository}</h1>;
};

export default Repository;
