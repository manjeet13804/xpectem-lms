import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddCertificateTable1576755283501 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `course_certificate` (`id` int NOT NULL AUTO_INCREMENT, `grade_text` text NULL, `dont_show_exams` tinyint NOT NULL, `signatures` varchar(255) NOT NULL, `course_name` varchar(255) NULL, `content` text NULL, `url` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_grade_text`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_dont_show_exams`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_signatures`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_course_name`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_content`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_url`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_email_from_email`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_email_from_name`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_email_content`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_email_url`');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_email` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_letter` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_letter_template` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_email_template` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_template` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_id` int NULL');
    await queryRunner.query('ALTER TABLE `course` ADD CONSTRAINT `FK_20e8c8ec043a7fa8fdfb9ce1190` FOREIGN KEY (`certificate_id`) REFERENCES `course_certificate`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP FOREIGN KEY `FK_20e8c8ec043a7fa8fdfb9ce1190`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_id`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_template`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_email_template`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_letter_template`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_letter`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `welcome_email`');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_email_url` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_email_content` text NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_email_from_name` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `welcome_email_from_email` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_url` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_content` text NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_course_name` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_signatures` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_dont_show_exams` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_grade_text` text NULL');
    await queryRunner.query('DROP TABLE `course_certificate`');
  }

}
