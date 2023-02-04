import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSystemRequirmentsToCourseTranslation1615798180049 implements MigrationInterface {
    name = 'AddSystemRequirmentsToCourseTranslation1615798180049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` DROP COLUMN `system_requirements`");
        await queryRunner.query("ALTER TABLE `course_translation` ADD `system_requirements` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course_translation` DROP COLUMN `system_requirements`");
        await queryRunner.query("ALTER TABLE `course` ADD `system_requirements` text NULL");
    }

}
