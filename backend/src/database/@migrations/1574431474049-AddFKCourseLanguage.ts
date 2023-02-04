import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddFKCourseLanguage1574431474049 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `language`');
    await queryRunner.query('ALTER TABLE `course` ADD `language` int NULL');
    await queryRunner.query('ALTER TABLE `course` ADD CONSTRAINT `FK_06889a06516d7596f255302f8fa` FOREIGN KEY (`language`) REFERENCES `language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP FOREIGN KEY `FK_06889a06516d7596f255302f8fa`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `language`');
    await queryRunner.query('ALTER TABLE `course` ADD `language` varchar(255) NOT NULL');
  }
}
