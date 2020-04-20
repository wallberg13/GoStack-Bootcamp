import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

/**
 * Diferença entre React e ReactNative: nada!!!
 * Só muda os componentes.
 */

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const dataProject = {
      title: `Caralhinho Voador!! ${Date.now()}`,
      owner: "Cu de Curioso",
    };

    const { data: project } = await api.post("/projects", dataProject);

    setProjects([...projects, project]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          // A FlatList só renderiza o que está sendo visto em tela. Visualmente, ScrollView
          // e FlatList é a mesma coisa. Mas em perfomace, a FlatList é bem mais perfomática.
          // style={styles.container} // Estilo do componente, é um container normal
          data={projects} // Dado que será exibido em tela
          keyExtractor={(project) => project.id} // Uma função, que possui como parâmetro, um elemento da lista que está na propriedade data.
          renderItem={(
            { item: project } // Função que vai renderizar o elemento. Que é o retorno dos componentes.
          ) => <Text style={styles.title}>{project.title}</Text>}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

/**
 * Todos os componentes do ReactNative possuem por padrão "display: flex"
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
    // justifyContent: "center",
    // alignItems: "center",
  },

  title: {
    color: "#FFF",
    fontSize: 30,
  },

  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
