import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class CreateCourseCertificateForCourse1579694112256 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course_certificate` ADD `original_name` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `course_certificate_id` int NULL');
    await queryRunner.query('ALTER TABLE `course` ADD CONSTRAINT `FK_28e49177d1925962b7b4b0469af` FOREIGN KEY (`course_certificate_id`) REFERENCES `course_certificate`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP FOREIGN KEY `FK_28e49177d1925962b7b4b0469af`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `course_certificate_id`');
    await queryRunner.query('ALTER TABLE `course_certificate` DROP COLUMN `original_name`');
  }

}
