import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFieldsLmsGroup1593360129351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query("ALTER TABLE `lms_group` ADD `max_lms_group_admins_setting` int NOT NULL");
      await queryRunner.query("ALTER TABLE `lms_group` ADD `max_organisations_setting` int NOT NULL");
      await queryRunner.query("ALTER TABLE `lms_group` ADD `max_organisation_admins_setting` int NOT NULL");
      await queryRunner.query("ALTER TABLE `lms_group` ADD `max_courses_setting` int NOT NULL");
      await queryRunner.query("ALTER TABLE `lms_group` ADD `max_students_setting` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `max_students_setting`");
      await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `max_courses_setting`");
      await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `max_organisation_admins_setting`");
      await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `max_organisations_setting`");
      await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `max_lms_group_admins_setting`");
    }

}
