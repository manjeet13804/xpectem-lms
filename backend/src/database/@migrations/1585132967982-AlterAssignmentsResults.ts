import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAssignmentsResults1585132967982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `assignment_results` DROP COLUMN `result`');
    await queryRunner.query('ALTER TABLE `assignment_results` ADD `result` json NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `assignment_results` DROP COLUMN `result`');
    await queryRunner.query('ALTER TABLE `assignment_results` ADD `result` varchar(255) NULL');
  }
}
