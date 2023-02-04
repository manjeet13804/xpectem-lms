import {MigrationInterface, QueryRunner} from "typeorm";

export class OrganisationCoursePermissions1633090288454 implements MigrationInterface {
    name = 'OrganisationCoursePermissions1633090288454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `organisation_course_permissions` (`id` int NOT NULL AUTO_INCREMENT, `course_id` int NULL, `organisation_id` int NULL, `permission_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `organisation_course_permissions` ADD CONSTRAINT `FK_aa87564bfb2e21c1ba410d7b2f8` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organisation_course_permissions` ADD CONSTRAINT `FK_d72e4dffaea17ed0b582477d3eb` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `organisation_course_permissions` ADD CONSTRAINT `FK_6e1e50bdd3bba6fccea7311ff5f` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `organisation_course_permissions` DROP FOREIGN KEY `FK_6e1e50bdd3bba6fccea7311ff5f`");
        await queryRunner.query("ALTER TABLE `organisation_course_permissions` DROP FOREIGN KEY `FK_d72e4dffaea17ed0b582477d3eb`");
        await queryRunner.query("ALTER TABLE `organisation_course_permissions` DROP FOREIGN KEY `FK_aa87564bfb2e21c1ba410d7b2f8`");
        await queryRunner.query("DROP TABLE `organisation_course_permissions`");
    }

}
