import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnCourseUrl1573634222689 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` ADD `url` varchar(255) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `url`');
  }

}
