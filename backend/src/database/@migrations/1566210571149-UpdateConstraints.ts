import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateConstraints1566210571149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `organisation` DROP FOREIGN KEY `FK_037800a1b8ae9a62c5a05debe9b`');
    await queryRunner.query('ALTER TABLE `group` DROP FOREIGN KEY `FK_bd933c27b9c35682d687c787b2d`');
    await queryRunner.query('ALTER TABLE `organisation` ADD CONSTRAINT `FK_037800a1b8ae9a62c5a05debe9b` FOREIGN KEY (`lms_groups_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `group` ADD CONSTRAINT `FK_bd933c27b9c35682d687c787b2d` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `group` DROP FOREIGN KEY `FK_bd933c27b9c35682d687c787b2d`');
    await queryRunner.query('ALTER TABLE `organisation` DROP FOREIGN KEY `FK_037800a1b8ae9a62c5a05debe9b`');
    await queryRunner.query('ALTER TABLE `group` ADD CONSTRAINT `FK_bd933c27b9c35682d687c787b2d` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `organisation` ADD CONSTRAINT `FK_037800a1b8ae9a62c5a05debe9b` FOREIGN KEY (`lms_groups_id`) REFERENCES `lms_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
