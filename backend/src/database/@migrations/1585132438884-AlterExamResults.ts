import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterExamResults1585132438884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `exam_results` DROP COLUMN `result`');
    await queryRunner.query('ALTER TABLE `exam_results` ADD `result` json NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `exam_results` DROP COLUMN `result`');
    await queryRunner.query('ALTER TABLE `exam_results` ADD `result` int NULL');
  }
}
