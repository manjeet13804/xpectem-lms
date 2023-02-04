import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserLog1567404914292 implements MigrationInterface {
    // tslint:disable:max-line-length
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `organisation` DROP FOREIGN KEY `FK_037800a1b8ae9a62c5a05debe9b`');
    await queryRunner.query('CREATE TABLE `user_log` (`id` int NOT NULL AUTO_INCREMENT, `latest_login` datetime NULL, `operating_system` varchar(255) NULL, `browser` varchar(255) NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by_id` int NULL, `changed_by_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `organisation` DROP COLUMN `lms_groups_id`');
    await queryRunner.query('ALTER TABLE `organisation` ADD `lms_group_id` int NULL');
    await queryRunner.query('ALTER TABLE `organisation` ADD `created_by_id` int NULL');
    await queryRunner.query('ALTER TABLE `organisation` ADD `changed_by_id` int NULL');
    await queryRunner.query('ALTER TABLE `lms_group` ADD `created_by_id` int NULL');
    await queryRunner.query('ALTER TABLE `lms_group` ADD `changed_by_id` int NULL');
    await queryRunner.query('ALTER TABLE `group` ADD `created_by_id` int NULL');
    await queryRunner.query('ALTER TABLE `group` ADD `changed_by_id` int NULL');
    await queryRunner.query('ALTER TABLE `user_email` ADD `welcome_email_sent` datetime NULL');
    await queryRunner.query('ALTER TABLE `user` ADD `user_log_id` int NULL');
    await queryRunner.query('ALTER TABLE `user` ADD UNIQUE INDEX `IDX_7c6c38e6020fa76035ec94e6a2` (`user_log_id`)');
    await queryRunner.query('CREATE UNIQUE INDEX `REL_7c6c38e6020fa76035ec94e6a2` ON `user` (`user_log_id`)');
    await queryRunner.query('ALTER TABLE `organisation` ADD CONSTRAINT `FK_289739f640a2375b787f098053b` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `organisation` ADD CONSTRAINT `FK_6f7f46f14706a98b7c73fc95fd9` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `organisation` ADD CONSTRAINT `FK_0b5577aae6f3d5bd0b1d6d58885` FOREIGN KEY (`changed_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `lms_group` ADD CONSTRAINT `FK_566d007b44a1cdd44fc9cdbbafc` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `lms_group` ADD CONSTRAINT `FK_4773236b2eb011da320553e9b58` FOREIGN KEY (`changed_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `group` ADD CONSTRAINT `FK_7b9ea5a434669ea5eb00bbe2226` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `group` ADD CONSTRAINT `FK_5e9cc7dac17e7d863a4fa8eab84` FOREIGN KEY (`changed_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_log` ADD CONSTRAINT `FK_40ddbbd1c7c61cc9bc97483e652` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_log` ADD CONSTRAINT `FK_8c0910a071213511853dea85b39` FOREIGN KEY (`changed_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_7c6c38e6020fa76035ec94e6a2d` FOREIGN KEY (`user_log_id`) REFERENCES `user_log`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_7c6c38e6020fa76035ec94e6a2d`');
    await queryRunner.query('ALTER TABLE `user_log` DROP FOREIGN KEY `FK_8c0910a071213511853dea85b39`');
    await queryRunner.query('ALTER TABLE `user_log` DROP FOREIGN KEY `FK_40ddbbd1c7c61cc9bc97483e652`');
    await queryRunner.query('ALTER TABLE `group` DROP FOREIGN KEY `FK_5e9cc7dac17e7d863a4fa8eab84`');
    await queryRunner.query('ALTER TABLE `group` DROP FOREIGN KEY `FK_7b9ea5a434669ea5eb00bbe2226`');
    await queryRunner.query('ALTER TABLE `lms_group` DROP FOREIGN KEY `FK_4773236b2eb011da320553e9b58`');
    await queryRunner.query('ALTER TABLE `lms_group` DROP FOREIGN KEY `FK_566d007b44a1cdd44fc9cdbbafc`');
    await queryRunner.query('ALTER TABLE `organisation` DROP FOREIGN KEY `FK_0b5577aae6f3d5bd0b1d6d58885`');
    await queryRunner.query('ALTER TABLE `organisation` DROP FOREIGN KEY `FK_6f7f46f14706a98b7c73fc95fd9`');
    await queryRunner.query('ALTER TABLE `organisation` DROP FOREIGN KEY `FK_289739f640a2375b787f098053b`');
    await queryRunner.query('DROP INDEX `REL_7c6c38e6020fa76035ec94e6a2` ON `user`');
    await queryRunner.query('ALTER TABLE `user` DROP INDEX `IDX_7c6c38e6020fa76035ec94e6a2`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `user_log_id`');
    await queryRunner.query('ALTER TABLE `user_email` DROP COLUMN `welcome_email_sent`');
    await queryRunner.query('ALTER TABLE `group` DROP COLUMN `changed_by_id`');
    await queryRunner.query('ALTER TABLE `group` DROP COLUMN `created_by_id`');
    await queryRunner.query('ALTER TABLE `lms_group` DROP COLUMN `changed_by_id`');
    await queryRunner.query('ALTER TABLE `lms_group` DROP COLUMN `created_by_id`');
    await queryRunner.query('ALTER TABLE `organisation` DROP COLUMN `changed_by_id`');
    await queryRunner.query('ALTER TABLE `organisation` DROP COLUMN `created_by_id`');
    await queryRunner.query('ALTER TABLE `organisation` DROP COLUMN `lms_group_id`');
    await queryRunner.query('ALTER TABLE `organisation` ADD `lms_groups_id` int NULL');
    await queryRunner.query('DROP TABLE `user_log`');
    await queryRunner.query('ALTER TABLE `organisation` ADD CONSTRAINT `FK_037800a1b8ae9a62c5a05debe9b` FOREIGN KEY (`lms_groups_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

}
