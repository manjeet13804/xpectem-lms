import {MigrationInterface, QueryRunner} from "typeorm";

export class Permissions1619614303059 implements MigrationInterface {
    name = 'Permissions1619614303059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `permission` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `permission`');
    }

}
