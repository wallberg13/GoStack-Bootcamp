import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export default class AlterProviderFieldToProviderId1587265470595
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("appointments", "provider");
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({ name: "provider_id", type: "uuid", isNullable: true })
    );
    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "AppointmentProvider",
        columnNames: ["provider_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        /**
         * OnDelete:
         * RESTRICT: usuário não pode ser deletado
         * SET NULL: id usuário fica como nulo.
         * CASCADE: deleta tudo
         */
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
      })
    );
  }

  /**
   * Método down sempre é executado na ordem reversa
   * @param queryRunner
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("appointments", "AppointmentProvider");
    await queryRunner.dropColumn("appointments", "provider_id");
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider",
        type: "varchar"
      })
    );
  }
}
