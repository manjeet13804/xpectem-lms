import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddCommunication1562688910229 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `communication_attachment` (`id` int NOT NULL AUTO_INCREMENT, `uri` varchar(255) NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `communication_message_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `communication` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `course_id` int NULL, `user_id` int NULL, `tutor_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `communication_dialog` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `communication_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `communication_message` (`id` int NOT NULL AUTO_INCREMENT, `heading` varchar(255) NOT NULL, `message` varchar(255) NOT NULL, `is_checked` tinyint NOT NULL DEFAULT 0, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `communication_dialog_id` int NULL, `author_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `communication_attachment` ADD CONSTRAINT `FK_1addfc72b7291f70c6ceb122db6` FOREIGN KEY (`communication_message_id`) REFERENCES `communication_message`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `communication` ADD CONSTRAINT `FK_95bf8d6fc7a1e6074c0b3054d09` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `communication` ADD CONSTRAINT `FK_3120e867d4bf41caa7b8984440e` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `communication` ADD CONSTRAINT `FK_945ca484d447e8d0c32585bc610` FOREIGN KEY (`tutor_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `communication_dialog` ADD CONSTRAINT `FK_947f71bbebaac361c6c4832ae97` FOREIGN KEY (`communication_id`) REFERENCES `communication`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `communication_message` ADD CONSTRAINT `FK_0e65bc595c811399c0d377299d7` FOREIGN KEY (`communication_dialog_id`) REFERENCES `communication_dialog`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `communication_message` ADD CONSTRAINT `FK_5705c8ad454ca12b3cffebaf121` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `communication_message` DROP FOREIGN KEY `FK_5705c8ad454ca12b3cffebaf121`');
    await queryRunner.query('ALTER TABLE `communication_message` DROP FOREIGN KEY `FK_0e65bc595c811399c0d377299d7`');
    await queryRunner.query('ALTER TABLE `communication_dialog` DROP FOREIGN KEY `FK_947f71bbebaac361c6c4832ae97`');
    await queryRunner.query('ALTER TABLE `communication` DROP FOREIGN KEY `FK_945ca484d447e8d0c32585bc610`');
    await queryRunner.query('ALTER TABLE `communication` DROP FOREIGN KEY `FK_3120e867d4bf41caa7b8984440e`');
    await queryRunner.query('ALTER TABLE `communication` DROP FOREIGN KEY `FK_95bf8d6fc7a1e6074c0b3054d09`');
    await queryRunner.query('ALTER TABLE `communication_attachment` DROP FOREIGN KEY `FK_1addfc72b7291f70c6ceb122db6`');
    await queryRunner.query('DROP TABLE `communication_message`');
    await queryRunner.query('DROP TABLE `communication_dialog`');
    await queryRunner.query('DROP TABLE `communication`');
    await queryRunner.query('DROP TABLE `communication_attachment`');
  }

}
