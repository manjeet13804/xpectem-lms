import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFilesToLessons1601906449516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `course_attachment` ADD `lesson_id` int NULL");
        await queryRunner.query("ALTER TABLE `course_attachment` ADD CONSTRAINT `FK_517c2150c00de419d9dc4556a95` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `course_attachment` DROP FOREIGN KEY `FK_517c2150c00de419d9dc4556a95`");
        await queryRunner.query("ALTER TABLE `course_attachment` DROP COLUMN `lesson_id`");
    }

}
