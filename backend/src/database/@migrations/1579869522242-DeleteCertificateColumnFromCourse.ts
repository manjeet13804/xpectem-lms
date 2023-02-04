import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteCertificateColumnFromCourse1579869522242 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate`');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` ADD `certificate` varchar(255) NULL');
  }

}
