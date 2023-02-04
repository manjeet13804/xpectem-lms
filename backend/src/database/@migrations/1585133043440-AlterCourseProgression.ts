import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCourseProgression1585133043440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `course_progression` CHANGE `progress` `progression` varchar(255) NULL',
    );
    await queryRunner.query('ALTER TABLE `course_progression` DROP COLUMN `progression`');
    await queryRunner.query('ALTER TABLE `course_progression` ADD `progression` json NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course_progression` DROP COLUMN `progression`');
    await queryRunner.query('ALTER TABLE `course_progression` ADD `progression` varchar(255) NULL');
    await queryRunner.query(
      'ALTER TABLE `course_progression` CHANGE `progression` `progress` varchar(255) NULL',
    );
  }
}
