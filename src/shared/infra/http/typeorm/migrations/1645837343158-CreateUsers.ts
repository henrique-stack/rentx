import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1645837343158 implements MigrationInterface {
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar"
                },
                {
                    name: "avatar",
                    isNullable: true,
                    type: "varchar",
                },
                {
                    name: "isAdmin",
                    type: "boolean",
                    default: false
                },
                {
                    name: "drive_license",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        })
    )
};

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  };
};
