import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import routes from "./routes";

import "@shared/infra/typeorm";
import "@shared/container";

/**
 * Para utilizar o TypeORM, basta iniciar a aplicação, e importar a mesma,
 * que já saí tudo funcionando (já entra fudendo!!);
 */

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
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
