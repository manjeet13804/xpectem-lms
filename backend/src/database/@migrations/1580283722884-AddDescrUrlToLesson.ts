import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescrUrlToLesson1580283722884 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `lesson` ADD `description` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `lesson` ADD `url` varchar(255) NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `lesson` DROP COLUMN `url`');
    await queryRunner.query('ALTER TABLE `lesson` DROP COLUMN `description`');
  }
}
