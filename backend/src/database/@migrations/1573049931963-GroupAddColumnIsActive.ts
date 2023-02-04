import { MigrationInterface, QueryRunner } from 'typeorm';

export class GroupAddColumnIsActive1573049931963 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `group` ADD `is_active` tinyint NOT NULL DEFAULT 0');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `group` DROP COLUMN `is_active`');
  }

}
