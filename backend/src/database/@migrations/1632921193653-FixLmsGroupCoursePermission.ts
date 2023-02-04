import {MigrationInterface, QueryRunner} from "typeorm";

export class FixLmsGroupCoursePermission1632921193653 implements MigrationInterface {
    name = 'FixLmsGroupCoursePermission1632921193653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` CHANGE `course_id` `course_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` CHANGE `lms_group_id` `lms_group_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` CHANGE `permission_id` `permission_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` ADD CONSTRAINT `FK_8aee26c806a20a002ae514bd6bc` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` ADD CONSTRAINT `FK_8d4f538a1d3df9f2ecae31438bc` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` ADD CONSTRAINT `FK_08725ff2d4a2387511f662b08ce` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` DROP FOREIGN KEY `FK_08725ff2d4a2387511f662b08ce`");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` DROP FOREIGN KEY `FK_8d4f538a1d3df9f2ecae31438bc`");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` DROP FOREIGN KEY `FK_8aee26c806a20a002ae514bd6bc`");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` CHANGE `permission_id` `permission_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` CHANGE `lms_group_id` `lms_group_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` CHANGE `course_id` `course_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `lms_group_course_permissions` DROP COLUMN `id`");
    }

}
