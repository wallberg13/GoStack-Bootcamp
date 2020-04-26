import React from "react";
import { FiChevronRight } from "react-icons/fi";
/**
 * Todo arquivo CSS ele se torna sendo global na aplicação, assim,
 * possuindo a necessidade de limitar cada CSS em um componente.
 * Para isso, é necessário criar umas Divs
 */
import logoImg from "../../assets/logo.svg";
import { Title, Form, Repositories } from "./styles";
/**
 * Por que utilizar no formato de constante:
 * - Pq é mais simples definir a tipagem do componente.
 *
 * O Tipo React.FC é de: React Function
 *
 * Semânticamente, algo clicável no HTML, ou é uma ancora (a), ou é um botão.
 */
const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form action="">
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/8339296?s=460&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
            alt="Wall Berg Morais"
          />
          <div>
            <strong>Maratona Linux Utils</strong>
            <p>Pacote com todos os útils das Maratona Linux</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/8339296?s=460&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
            alt="Wall Berg Morais"
          />
          <div>
            <strong>Maratona Linux Utils</strong>
            <p>Pacote com todos os útils das Maratona Linux</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/8339296?s=460&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
            alt="Wall Berg Morais"
          />
          <div>
            <strong>Maratona Linux Utils</strong>
            <p>Pacote com todos os útils das Maratona Linux</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars1.githubusercontent.com/u/8339296?s=460&u=799817970db70debe9c79d63fa4ef04f8ffaafc7&v=4"
            alt="Wall Berg Morais"
          />
          <div>
            <strong>Maratona Linux Utils</strong>
            <p>Pacote com todos os útils das Maratona Linux</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
