import "reflect-metadata";
import express from "express";
import routes from "./routes";

import uploadConfig from "./config/upload";

/**
 * Para utilizar o TypeORM, basta iniciar a aplicação, e importar a mesma,
 * que já saí tudo funcionando (já entra fudendo!!);
 */
import "./database";

const app = express();

app.use(express.json());

app.use("/files", express.static(uploadConfig.directory));

app.use(routes);

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});
