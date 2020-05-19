/**
 * Qual objetivo do erro?
 * Agora entendi a logica. Esse é o objeto que vai está no Throw. Hehehehe.
 */

class AppError {
  public readonly message: string; // Public Readonly (usuário ver de fora, mas não escreve)

  public readonly statusCode: number; // 400, 401, 404

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
