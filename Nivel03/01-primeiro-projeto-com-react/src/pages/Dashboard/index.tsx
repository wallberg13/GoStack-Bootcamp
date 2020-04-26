import React from "react";

/**
 * Todo arquivo CSS ele se torna sendo global na aplicação, assim,
 * possuindo a necessidade de limitar cada CSS em um componente.
 * Para isso, é necessário criar umas Divs
 */

import { Title } from "./styles";
/**
 * Por que utilizar no formato de constante:
 * - Pq é mais simples definir a tipagem do componente.
 *
 * O Tipo React.FC é de: React Function
 */
const Dashboard: React.FC = () => {
  return <Title>Explore repositórios no Github</Title>;
};

export default Dashboard;
