import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import routes from "./routes";

import uploadConfig from "./config/upload";

/**
 * Para utilizar o TypeORM, basta iniciar a aplicação, e importar a mesma,
 * que já saí tudo funcionando (já entra fudendo!!);
 */
import "./database";
import AppError from "./errors/AppError";

const app = express();

app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

/**
 * O que muda?
 * Um middleware normal para um middleware de error
 */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Se o erro foi originado na nossa aplicação..
  // Express não tem tratativa para erros gerados em rotas no formato async await
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});
