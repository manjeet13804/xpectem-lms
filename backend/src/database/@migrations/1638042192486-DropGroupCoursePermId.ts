import {MigrationInterface, QueryRunner} from "typeorm";

export class DropGroupCoursePermId1638042192486 implements MigrationInterface {
    name = 'DropGroupCoursePermId1638042192486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `group_course_permissions`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `group_course_permissions` (`id` int NOT NULL AUTO_INCREMENT, `course_id` int NULL, `group_id` int NULL, `permission_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `group_course_permissions` ADD CONSTRAINT `FK_29dcfa7668cbca1ffcd269a92ca` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `group_course_permissions` ADD CONSTRAINT `FK_95f3303031e3d763b8d0968082e` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `group_course_permissions` ADD CONSTRAINT `FK_d40cd58feccf39ff66850d67274` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
