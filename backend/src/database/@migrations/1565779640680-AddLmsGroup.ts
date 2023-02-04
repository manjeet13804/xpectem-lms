import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddLmsGroup1565779640680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `lms_group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `access_expire_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `max_lms_group_admins` int NOT NULL, `max_organisations` int NOT NULL, `max_organisation_admins` int NOT NULL, `max_courses` int NOT NULL, `max_students` int NOT NULL, `is_active` tinyint NOT NULL DEFAULT 0, `notify_sms` tinyint NOT NULL DEFAULT 0, `has_access_to_mmc` tinyint NOT NULL DEFAULT 0, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_1177123515e2e6d7c86c463550` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `language` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_7df7d1e250ea2a416f078a631f` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `lms_group_translation` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `admin_welcome_text` varchar(255) NOT NULL, `student_welcome_text` varchar(255) NOT NULL, `language_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `organisation` ADD `lms_groups_id` int NULL');
    await queryRunner.query('ALTER TABLE `organisation` ADD CONSTRAINT `FK_037800a1b8ae9a62c5a05debe9b` FOREIGN KEY (`lms_groups_id`) REFERENCES `lms_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `lms_group_translation` ADD CONSTRAINT `FK_ef03c3401bdaa81bcfb4b3165ed` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `lms_group_translation` DROP FOREIGN KEY `FK_ef03c3401bdaa81bcfb4b3165ed`');
    await queryRunner.query('ALTER TABLE `organisation` DROP FOREIGN KEY `FK_037800a1b8ae9a62c5a05debe9b`');
    await queryRunner.query('ALTER TABLE `organisation` DROP COLUMN `lms_groups_id`');
    await queryRunner.query('DROP TABLE `lms_group_translation`');
    await queryRunner.query('DROP INDEX `IDX_7df7d1e250ea2a416f078a631f` ON `language`');
    await queryRunner.query('DROP TABLE `language`');
    await queryRunner.query('DROP INDEX `IDX_1177123515e2e6d7c86c463550` ON `lms_group`');
    await queryRunner.query('DROP TABLE `lms_group`');
  }
}
