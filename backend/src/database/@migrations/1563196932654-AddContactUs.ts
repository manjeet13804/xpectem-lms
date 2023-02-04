import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddContactUs1563196932654 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `contact_us_attachment` (`id` int NOT NULL AUTO_INCREMENT, `uri` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `contact_us_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `contact_us` (`id` int NOT NULL AUTO_INCREMENT, `message` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `course_id` int NULL, `user_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `communication_message` CHANGE `message` `message` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `communication_message` CHANGE `is_checked` `is_checked` tinyint NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `contact_us_attachment` ADD CONSTRAINT `FK_72ce9f1a0e8370b9cf7e42dc32f` FOREIGN KEY (`contact_us_id`) REFERENCES `contact_us`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `contact_us` ADD CONSTRAINT `FK_ca6170acce01a0f8a3da22adec7` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `contact_us` ADD CONSTRAINT `FK_0053da5d6eb571f3ba05db1fb17` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `contact_us` DROP FOREIGN KEY `FK_0053da5d6eb571f3ba05db1fb17`');
    await queryRunner.query('ALTER TABLE `contact_us` DROP FOREIGN KEY `FK_ca6170acce01a0f8a3da22adec7`');
    await queryRunner.query('ALTER TABLE `contact_us_attachment` DROP FOREIGN KEY `FK_72ce9f1a0e8370b9cf7e42dc32f`');
    await queryRunner.query('ALTER TABLE `communication_message` CHANGE `is_checked` `is_checked` tinyint(255) NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `communication_message` CHANGE `message` `message` varchar(255) NULL');
    await queryRunner.query('DROP TABLE `contact_us`');
    await queryRunner.query('DROP TABLE `contact_us_attachment`');
  }

}
