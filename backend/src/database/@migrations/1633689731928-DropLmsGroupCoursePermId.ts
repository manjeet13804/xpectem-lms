import {MigrationInterface, QueryRunner} from "typeorm";

export class DropLmsGroupCoursePermId1633689731928 implements MigrationInterface {
    name = 'AddLmsGroupCoursePermId1633689731928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `lms_group_course_permissions`');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `lms_group_course_permissions` (`course_id` int NOT NULL, `lms_group_id` int NOT NULL,`permission_id` int NOT NULL, PRIMARY KEY (`course_id`, `lms_group_id`, `permission_id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `lms_group_course_permissions` ADD CONSTRAINT `FK_b9762a3da4695e1ccd34682c465` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `lms_group_course_permissions` ADD CONSTRAINT `FK_b5661d287a6656c4d41e766c465` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `lms_group_course_permissions` ADD CONSTRAINT `FK_c5661d287a6656c4d41e766c465` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    }

}
