import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsConsistentlyToCourse1563873200481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` ADD `is_consistently` tinyint NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `is_consistently`');
  }
}
