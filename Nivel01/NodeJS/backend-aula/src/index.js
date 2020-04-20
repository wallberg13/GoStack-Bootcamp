const express = require("express");
const { uuid, isUuid } = require("uuidv4");
const cors = require("cors");
const app = express();
app.use(cors());
/**
 * OBS: Middlewares de autenticação, sempre devem está
 * antes de toda e qualquer requisição.
 */

/**
 * Como o use é um middleware. Aqui estou dizendo que todas
 * as rotas estão sujeitas a essa função do express.json(), assim,
 * o corpo de toda a requisição será transformada em JSON.
 *
 * Sempre deve vim antes das rotas, para que a configuração seja
 * executada antes das rotas.
 */
app.use(express.json());

/**
 * Sempre será enviado um JSON
 * O que fica dps da Barra, é um recurso.
 * Listar alguma informação
 */

/**
 * Middleware:
 *
 * Interceptador de requisições que interromper totalmente a requisição
 * ou alterar dados da requisição.
 */

const projects = [];

/**
 * Construindo um Middleware.
 * Middleware que não é rotas.
 * Geralmente, serve para mostrar alguma coisa toda vez
 * que tiver alguma requisição.
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next(); // Chamando o próximo middleware.
  console.timeEnd(logLabel);
  return;
}

// 1 - 2 - 3

app.use(logRequest);

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

/**
 * Middleware para interromper toda a
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
function validadeProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    // Return sem next não é executado no final.
    return response.status(400).json({ error: "Invalid project ID." });
  }

  return next();
}

app.use("/project/:id", validadeProjectId);

/**
 * Criar uma informação
 */
app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", validadeProjectId, (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  const project = { id, title, owner };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", validadeProjectId, (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  /**
   * Passo o indice que desejo remover + 1 posição a partir
   * deste indice
   */
  projects.splice(projectIndex, 1);

  /**
   * Status 204:
   * -> Resposta vazia
   */
  return response.status(204).send();
});

/**
 * A aplicação precisa ouvir uma porta.
 */
app.listen(3333, () => {
  console.log("🚀️ Back-end started!");
});
