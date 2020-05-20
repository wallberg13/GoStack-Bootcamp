import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1587182615623
  implements MigrationInterface {
  /**
   * O que acontece no banco, quando essa migration sobe no banco de dados.
   * @param queryRunner
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointments",
        columns: [
          {
            name: "id", // Nome da Tabela
            type: "uuid", // Do tipo Varchar
            isPrimary: true, // Chave primaria
            generationStrategy: "uuid", // Método de geração de chave
            default: "uuid_generate_v4()" // No PG, para o valor default, tem que gerar um uuid, se nao, continua nulo.
          },
          {
            name: "provider",
            type: "varchar"
          },
          {
            name: "date",
            type: "timestamp with time zone" // Somente no PG
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );
  }

  /**
   * E se eu fiz merda, como que posso voltar: ROLLBACK <FAILBACK>!!
   * Método para desfazer as alterações realizadas no up.
   * @param queryRunner
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointments");
  }
}

/**
 * Linha do tempo:
 * -> Como controlar?
 *
 * 1º semana: Agendamento
 * 2º semana: Usuários
 * (NOVO DEV) 3º Edição Agendamentos
 * 4º semana: Compras
 *
 * O git faz para os softwares o que as migrations fazem para o banco de dados.
 * Elas contram a versao do banco de dados e controla as alterações simutâneas dentro
 * do nosso banco. Ao invés do Dev fazer as instruções direto no DB, ele cria uma
 * migration que faça todas as alterações necessárias do bancos.
 *
 * E se deu Merda?
 * REGRA DAS MIGRATIONS:
 * - Só se pode alterar as migrations que ainda não foram enviadas no controle de versão,
 *   ou seja, na migration que só funciona na minha máquina.
 */
