import {MigrationInterface, QueryRunner} from "typeorm";

export class addCollumnForCourseTranslation1602165699789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `course_translation` ADD `description_short` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `course_translation` DROP COLUMN `description_short`");
    }

}
