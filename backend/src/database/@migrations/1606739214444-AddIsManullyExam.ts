import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsManullyExam1606739214444 implements MigrationInterface {
    name = 'AddIsManullyExam1606739214444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` ADD `is_manually` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` DROP COLUMN `is_manually`");
    }

}
