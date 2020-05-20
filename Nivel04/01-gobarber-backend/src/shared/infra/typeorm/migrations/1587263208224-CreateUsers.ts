import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1587263208224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id", // Nome da Tabela
            type: "uuid", // Do tipo Varchar
            isPrimary: true, // Chave primaria
            generationStrategy: "uuid", // Método de geração de chave
            default: "uuid_generate_v4()" // No PG, para o valor default, tem que gerar um uuid, se nao, continua nulo.
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true
          },
          {
            name: "password",
            type: "varchar"
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
