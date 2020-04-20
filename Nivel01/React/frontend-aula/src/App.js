import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./App.css";

import Header from "./components/Headers";

/**
 * 3 Conceitos mais importantes do React
 * Componente:
 * Propriedade: é alguma informação que pode ser passada de uma propriedade pai para o filtro.
 * Estado & Imutabilidade:
 *
 *
 * useEffect: disparar funções assim que um componente for exibido em tela, ou quando alguma variável sofre alguma mutação.
 */

/**
 * Um componente é um função que retorna um HTML.
 * Sempre se cria um componente quando se deseja reaproveitar uma parte da aplicação.
 */
function App() {
  // Use State retorna um array com duas posições
  //
  // 1. Variável com seu valor inicial
  // 2. Função para atualizarmos esse valor
  // Sempre começe o estado do mesmo tipo que a variável daquele projeto será utilizada para sempre
  const [projects, setProjects] = useState([]);

  /**
   * Função que possui dois parâmetros.
   * 1 - Uma função que é executada assim que o componente é mostrado em tela.
   * 2 - Quando que essa função vai ser executada. Neste caso, é um array de variáveis que são "vigiadas"
   *     pelo o React. Mais conhecido como array de dependências, é adicionado também as variáveis que estão sendo
   *     utilizadas pela função do primeiro parâmetro.
   */
  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, `Novo Projeto ${Date.now()}`]);

    const response = await api.post("/projects", {
      title: `Caralhos de Azaaaa ${Date.now()}`,
      owner: "Bucetinha Cabeluda",
    });
    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>Título: {project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;
