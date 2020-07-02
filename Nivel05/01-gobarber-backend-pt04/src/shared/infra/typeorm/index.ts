import { createConnections } from "typeorm";

/**
 * Essa CreateConnection, o typeorm, irá procurar dentro do nosso projeto,
 * um arquivo chamado ormconfig.json, caso ele encontrar, a conexão já se inicia
 * sozinha e de forma automática.
 *
 * Porque o ormconfig.json
 *  -> Por que o typeorm oferece uma CLI, que permite que seja executado varios comandos
 *     que serao necessários no decorrer do projeto.
 */
createConnections();
