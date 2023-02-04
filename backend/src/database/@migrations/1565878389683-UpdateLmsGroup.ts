import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateLmsGroup1565878389683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `lms_group` ADD `logo_image_uri` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `lms_group_translation` ADD `lms_group_id` int NULL');
    await queryRunner.query('ALTER TABLE `lms_group_translation` ADD CONSTRAINT `FK_e2785b2537030609cf3f9ebad07` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('CREATE INDEX `IDX_95e5f0f0a609b5fe7dc998b488` ON `lms_group_translation` (`lms_group_id`, `language_id`)');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `lms_group` DROP COLUMN `logo_image_uri`');
    await queryRunner.query('ALTER TABLE `lms_group_translation` DROP FOREIGN KEY `FK_e2785b2537030609cf3f9ebad07`');
    await queryRunner.query('ALTER TABLE `lms_group_translation` DROP COLUMN `lms_group_id`');
    await queryRunner.query('DROP INDEX `IDX_95e5f0f0a609b5fe7dc998b488` ON `lms_group_translation`');
  }
}
