import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Validação do JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  // Bearer dkasjhdkjsad
  const [, token] = authHeader.split(" ");

  /**
   * Verifiy dá um throw
   */
  try {
    // Forçando o tipo de uma variavel
    const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload;

    request.user = {
      id: sub
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
