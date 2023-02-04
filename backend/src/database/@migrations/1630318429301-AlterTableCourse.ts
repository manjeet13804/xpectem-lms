import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableCourse1630318429301 implements MigrationInterface {
    name = 'AlterTableCourse1630318429301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` ADD `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` DROP COLUMN `created_at`");
    }

}
