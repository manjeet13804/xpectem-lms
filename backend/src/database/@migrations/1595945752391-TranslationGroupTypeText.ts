import {MigrationInterface, QueryRunner} from 'typeorm';

export class TranslationGroupTypeText1595945752391 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `group_translation` DROP COLUMN `description`");
    await queryRunner.query("ALTER TABLE `group_translation` ADD `description` text NOT NULL");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `group_translation` DROP COLUMN `description`");
    await queryRunner.query("ALTER TABLE `group_translation` ADD `description` varchar(255) NOT NULL");
  }
}
