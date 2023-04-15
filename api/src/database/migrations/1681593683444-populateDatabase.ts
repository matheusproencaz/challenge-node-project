import {MigrationInterface, QueryRunner} from "typeorm";
import { Company } from "../../entities/Company";
import { Car } from "../../entities/Car";
import { Bike } from "../../entities/Bike";

export class populateDatabase1681593683444 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const car = await queryRunner.manager.save(
            queryRunner.manager.create<Car>(Car, {
                brand: 'FIAT Uno',
                color: 'Vermelho',
                plate: 'BRA1E23',
            })
        );

        const bike = await queryRunner.manager.save(
            queryRunner.manager.create<Bike>(Bike, {
                brand: 'Honda CG',
                color: 'Preto',
                plate: 'BRA3E21',
            })
        );

        await queryRunner.manager.save(
            queryRunner.manager.create<Company>(Company, {
                name: 'Serviços TM',
                address: 'Rua Olinda, 150',
                cnpj: '12.345.678/0001-90',
                bikeParkingAmount: 1,
                carParkingAmount: 2,
                phone: '(47) 9 9999-9999',
                vehicles: [
                    bike,
                    car
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE * FROM vehicles`);
        await queryRunner.query(`DELETE * FROM companies`);
    }

}
