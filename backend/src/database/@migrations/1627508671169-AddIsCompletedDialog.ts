import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsCompletedDialog1627508671169 implements MigrationInterface {
    name = 'AddIsCompletedDialog1627508671169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `is_completed` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `is_completed`");
    }

}
