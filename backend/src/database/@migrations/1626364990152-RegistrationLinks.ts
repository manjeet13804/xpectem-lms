import {MigrationInterface, QueryRunner} from "typeorm";

export class RegistrationLinks1626364990152 implements MigrationInterface {
    name = 'RegistrationLinks1626364990152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `registration_link` (`id` int NOT NULL AUTO_INCREMENT, `uid` varchar(255) NOT NULL, `active` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `registration_link_groups_group` (`registration_link_id` int NOT NULL, `group_id` int NOT NULL, INDEX `IDX_889c3bb82cbb366e7f73a9d7f2` (`registration_link_id`), INDEX `IDX_e375a68fa34f5dda84e20de0d3` (`group_id`), PRIMARY KEY (`registration_link_id`, `group_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `registration_link_courses_course` (`registration_link_id` int NOT NULL, `course_id` int NOT NULL, INDEX `IDX_a2756dea02c6fd1e0e59da7503` (`registration_link_id`), INDEX `IDX_fed372572fb302ca1fb5d071ca` (`course_id`), PRIMARY KEY (`registration_link_id`, `course_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `registration_link_groups_group` ADD CONSTRAINT `FK_889c3bb82cbb366e7f73a9d7f28` FOREIGN KEY (`registration_link_id`) REFERENCES `registration_link`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `registration_link_groups_group` ADD CONSTRAINT `FK_e375a68fa34f5dda84e20de0d35` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `registration_link_courses_course` ADD CONSTRAINT `FK_a2756dea02c6fd1e0e59da75035` FOREIGN KEY (`registration_link_id`) REFERENCES `registration_link`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `registration_link_courses_course` ADD CONSTRAINT `FK_fed372572fb302ca1fb5d071ca6` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `registration_link_courses_course` DROP FOREIGN KEY `FK_fed372572fb302ca1fb5d071ca6`");
        await queryRunner.query("ALTER TABLE `registration_link_courses_course` DROP FOREIGN KEY `FK_a2756dea02c6fd1e0e59da75035`");
        await queryRunner.query("ALTER TABLE `registration_link_groups_group` DROP FOREIGN KEY `FK_e375a68fa34f5dda84e20de0d35`");
        await queryRunner.query("DROP INDEX `IDX_fed372572fb302ca1fb5d071ca` ON `registration_link_courses_course`");
        await queryRunner.query("DROP INDEX `IDX_a2756dea02c6fd1e0e59da7503` ON `registration_link_courses_course`");
        await queryRunner.query("DROP TABLE `registration_link_courses_course`");
        await queryRunner.query("DROP INDEX `IDX_e375a68fa34f5dda84e20de0d3` ON `registration_link_groups_group`");
        await queryRunner.query("DROP INDEX `IDX_889c3bb82cbb366e7f73a9d7f2` ON `registration_link_groups_group`");
        await queryRunner.query("DROP TABLE `registration_link_groups_group`");
        await queryRunner.query("DROP TABLE `registration_link`");
    }

}
