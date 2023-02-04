import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class DialogsAddColumnsMessageAttachment1577194410996 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `communication_attachment` ADD `communication_dialog_id` int NULL');
    await queryRunner.query('ALTER TABLE `communication_dialog` ADD `message` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `communication_dialog` ADD `author_id` int NULL');
    await queryRunner.query('ALTER TABLE `communication_attachment` ADD CONSTRAINT `FK_a63d17a0825f07f5ab6fd0acbda` FOREIGN KEY (`communication_dialog_id`) REFERENCES `communication_dialog`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `communication_dialog` ADD CONSTRAINT `FK_7904a8982c1a0b827b17f5df578` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `communication_dialog` DROP FOREIGN KEY `FK_7904a8982c1a0b827b17f5df578`');
    await queryRunner.query('ALTER TABLE `communication_attachment` DROP FOREIGN KEY `FK_a63d17a0825f07f5ab6fd0acbda`');
    await queryRunner.query('ALTER TABLE `communication_dialog` DROP COLUMN `author_id`');
    await queryRunner.query('ALTER TABLE `communication_dialog` DROP COLUMN `message`');
    await queryRunner.query('ALTER TABLE `communication_attachment` DROP COLUMN `communication_dialog_id`');
  }

}
