import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRental1648725927883 implements MigrationInterface {
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "rental",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "car_id",
                            type: "uuid"
                        },
                        {
                            name: "user_id",
                            type: "uuid"
                        },
                        {
                            name: "start_date",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "end_date",
                            type: "timestamp",
                            isNullable: true
                        },
                        {
                            name: "expected_return_date",
                            type: "timestamp"
                        },
                        {
                            name: "total",
                            type: "numeric",
                            isNullable: true
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
                    ],
                    foreignKeys: [
                        {
                            name: "FKCarRentals",
                            referencedTableName: "cars",
                            columnNames: ["car_id"],
                            referencedColumnNames: ["id"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL"
                        },
                        {
                            name: "FKUserRentals", 
                            referencedTableName: "users",  //another table.
                            columnNames: ["user_id"], // column referenced in extern table.
                            referencedColumnNames: ["id"], //column this table.
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL"
                        }
                    ]
                })
            )
        };
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("rental")
        };
    }
