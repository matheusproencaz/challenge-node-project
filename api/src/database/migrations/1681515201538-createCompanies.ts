import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCompanies1681515201538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "companies",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "cnpj",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "address",
                        type: "varchar",
                    },
                    {
                        name: "phone",
                        type: "varchar",
                    },
                    {
                        name: "bikeParkingAmount",
                        type: "numeric",
                    },
                    {
                        name: "carParkingAmount",
                        type: "numeric",
                    },
                    // {
                    //     name: 'vehicles',
                    //     type: 'uuid'
                    // },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                // foreignKeys: [
                //     {
                //         name: "fk_company_vehicles",
                //         columnNames: ["vehicles_id"],
                //         referencedTableName: "vehicles",
                //         referencedColumnNames: ["id"]
                //     }
                // ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("companies");
    }

}
