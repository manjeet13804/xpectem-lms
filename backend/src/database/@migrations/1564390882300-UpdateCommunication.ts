import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateCommunication1564390882300 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `communication_message` DROP COLUMN `heading`');
    await queryRunner.query('ALTER TABLE `communication_dialog` ADD `heading` varchar(255) NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `communication_dialog` DROP COLUMN `heading`');
    await queryRunner.query('ALTER TABLE `communication_message` ADD `heading` varchar(255) NOT NULL');
  }

}
