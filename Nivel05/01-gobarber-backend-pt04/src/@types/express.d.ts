/**
 * O nome disso é Override
 * Sobreescrevendo uma definição do express (as tipagens dele).
 * Tudo isso para adicionar o usuário por baixo dos panos no express. rsrsrs
 */
declare namespace Express {
  export interface Request {
    // Adicionando um informação nova dentro do nosso request,
    // sem precisar mexer na lib do express.
    user: {
      id: string;
    };
  }
}
