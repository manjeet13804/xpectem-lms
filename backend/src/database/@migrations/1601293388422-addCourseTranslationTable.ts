import {MigrationInterface, QueryRunner} from "typeorm";

export class addCourseTranslationTable1601293388422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `course_translation` (`id` int NOT NULL AUTO_INCREMENT, `description` text NOT NULL, `welcome_letter` text NOT NULL, `welcome_email` text NOT NULL, `course_id` int NULL, `language_id` int NULL, INDEX `IDX_eb2c5aa03fc2a802196c1c7583` (`course_id`, `language_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `course_translation` ADD CONSTRAINT `FK_49deba10062adb0d7c42fe6abf0` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `course_translation` ADD CONSTRAINT `FK_ff969f753ca26038486594d347a` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `course_translation` DROP FOREIGN KEY `FK_ff969f753ca26038486594d347a`");
        await queryRunner.query("ALTER TABLE `course_translation` DROP FOREIGN KEY `FK_49deba10062adb0d7c42fe6abf0`");
        await queryRunner.query("DROP INDEX `IDX_eb2c5aa03fc2a802196c1c7583` ON `course_translation`");
        await queryRunner.query("DROP TABLE `course_translation`");
    }

}
