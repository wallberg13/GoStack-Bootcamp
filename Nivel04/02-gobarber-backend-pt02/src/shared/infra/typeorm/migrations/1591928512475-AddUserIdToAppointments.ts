import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from "typeorm";

export default class AddUserIdToAppointments1591928512475
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "user_id",
        type: "uuid",
        isNullable: true
      })
    );

    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "AppointmentUser",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
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
    await queryRunner.dropForeignKey("appointments", "AppointmentUser");
    await queryRunner.dropColumn("appointments", "user_id");
  }
}
