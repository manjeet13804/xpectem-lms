import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class DeleteRelationCourseCertificate1577362630095 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP FOREIGN KEY `FK_20e8c8ec043a7fa8fdfb9ce1190`');
    await queryRunner.query('ALTER TABLE `course` CHANGE `certificate_id` `certificate` int NULL');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate`');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate` varchar(255) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate`');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate` int NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `certificate` `certificate_id` int NULL');
    await queryRunner.query('ALTER TABLE `course` ADD CONSTRAINT `FK_20e8c8ec043a7fa8fdfb9ce1190` FOREIGN KEY (`certificate_id`) REFERENCES `course_certificate`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
