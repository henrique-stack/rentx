import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  Table,
} from "typeorm";

export class CreateSpecificationsCars1645837708825
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_car",
        columns: [
          {
            name: "car_id",
            type: "uuid"
          },
          {
            name: "specification_id",
            type: "uuid"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );  

    await queryRunner.createForeignKey(
      "specifications_car",
      new TableForeignKey({
        name: "FKSpecificationsCar",
        referencedTableName: "specifications",
        columnNames: ["specification_id"],
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "specifications_car",
      new TableForeignKey({
        name: "FKCarSpecifications",
        referencedTableName: "cars",
        columnNames: ["car_id"],
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  };

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_car",
      "FKSpecificationsCar"
    );

    await queryRunner.dropForeignKey(
      "specifications_car",
      "FKCarSpecifications"
    );

    await queryRunner.dropTable("specifications_car");
  };
};
