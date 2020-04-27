import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import api from "../../services/api";
/**
 * Todo arquivo CSS ele se torna sendo global na aplicação, assim,
 * possuindo a necessidade de limitar cada CSS em um componente.
 * Para isso, é necessário criar umas Divs
 */
import logoImg from "../../assets/logo.svg";
import { Title, Form, Repositories, Error } from "./styles";

/**
 * Não precisamos colocar a Tipagem de tudo o que o meu repositório vai ter.
 */
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

/**
 * Por que utilizar no formato de constante:
 * - Pq é mais simples definir a tipagem do componente.
 *
 * O Tipo React.FC é de: React Function
 *
 * Semânticamente, algo clicável no HTML, ou é uma ancora (a), ou é um botão.
 *
 * wallberg13/GoStack-Bootcamp
 */
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Digite o autor/nome do repositório")
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setNewRepo("");
      setRepositories([...repositories, repository])
      setInputError("");
    } catch (e) {
      setInputError("Erro na busca por esse repositório")
    }

  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {/* && => A segunda parte só é executada de a primeira parte for satisfeita */}
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="test">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}

      </Repositories>
    </>
  );
};

export default Dashboard;
