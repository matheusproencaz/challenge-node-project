import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1681595890452 implements MigrationInterface {
    name = 'createTables1681595890452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" character varying NOT NULL, "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "bikeParkingAmount" integer NOT NULL, "carParkingAmount" integer NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "vehicles_type_enum" AS ENUM('bike', 'car')`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" character varying NOT NULL, "brand" character varying NOT NULL, "color" character varying NOT NULL, "plate" character varying NOT NULL, "type" "vehicles_type_enum" NOT NULL, "companyId" character varying, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_38bd4d6437d6bcdee1b14af034" ON "vehicles" ("type") `);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_f5243d588524b2a705fcdf9b4d5" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_f5243d588524b2a705fcdf9b4d5"`);
        await queryRunner.query(`DROP INDEX "IDX_38bd4d6437d6bcdee1b14af034"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TYPE "vehicles_type_enum"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
