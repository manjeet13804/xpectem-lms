import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAtColumnToRegLink1627640558759 implements MigrationInterface {
    name = 'AddCreatedAtColumnToRegLink1627640558759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `registration_link` ADD `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `registration_link` DROP COLUMN `created_at`");
    }

}
