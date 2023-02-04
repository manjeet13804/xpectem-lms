import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsChekedMessageColumn1610531537882 implements MigrationInterface {
    name = 'AddIsChekedMessageColumn1610531537882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_message` ADD `is_cheked` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_message` DROP COLUMN `is_cheked`");
    }

}
