import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGroupCoursePermId1638042568869 implements MigrationInterface {
    name = 'AddGroupCoursePermId1638042568869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `group_course_permissions` (`id` int NOT NULL AUTO_INCREMENT, `course_id` int NULL, `group_id` int NULL, `permission_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `group_course_permissions` ADD CONSTRAINT `FK_29dcfa7668cbca1ffcd269a92ca` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `group_course_permissions` ADD CONSTRAINT `FK_95f3303031e3d763b8d0968082e` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `group_course_permissions` ADD CONSTRAINT `FK_d40cd58feccf39ff66850d67274` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `group_course_permissions` DROP FOREIGN KEY `FK_d40cd58feccf39ff66850d67274`");
        await queryRunner.query("ALTER TABLE `group_course_permissions` DROP FOREIGN KEY `FK_95f3303031e3d763b8d0968082e`");
        await queryRunner.query("ALTER TABLE `group_course_permissions` DROP FOREIGN KEY `FK_29dcfa7668cbca1ffcd269a92ca`");
        await queryRunner.query("DROP TABLE `group_course_permissions`");
    }

}
