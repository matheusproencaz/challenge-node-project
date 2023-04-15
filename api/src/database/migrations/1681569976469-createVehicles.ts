import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createVehicles1681569976469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vehicles",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true 
                    },
                    {
                        name: "plate",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "brand",
                        type: "varchar",
                    },
                    {
                        name: "color",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },
                    // {
                    //     name: "company_id",
                    //     type: "uuid"
                    // },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                // foreignKeys: [
                //     {
                //         name: "fk_vehicles_company",
                //         columnNames: ["company_id"],
                //         referencedTableName: "companies",
                //         referencedColumnNames: ["id"]
                //     }
                // ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vehicles");
    }
}
