import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateLmsGroupTranslation1566210734931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `lms_group_translation` DROP FOREIGN KEY `FK_e2785b2537030609cf3f9ebad07`');
    await queryRunner.query('ALTER TABLE `lms_group_translation` DROP FOREIGN KEY `FK_ef03c3401bdaa81bcfb4b3165ed`');
    await queryRunner.query('ALTER TABLE `lms_group_translation` ADD CONSTRAINT `FK_e2785b2537030609cf3f9ebad07` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `lms_group_translation` ADD CONSTRAINT `FK_ef03c3401bdaa81bcfb4b3165ed` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `lms_group_translation` DROP FOREIGN KEY `FK_ef03c3401bdaa81bcfb4b3165ed`');
    await queryRunner.query('ALTER TABLE `lms_group_translation` DROP FOREIGN KEY `FK_e2785b2537030609cf3f9ebad07`');
    await queryRunner.query('ALTER TABLE `lms_group_translation` ADD CONSTRAINT `FK_ef03c3401bdaa81bcfb4b3165ed` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `lms_group_translation` ADD CONSTRAINT `FK_e2785b2537030609cf3f9ebad07` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
