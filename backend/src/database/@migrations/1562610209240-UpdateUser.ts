import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateUser1562610209240 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`');
    await queryRunner.query('DROP INDEX `IDX_5537e48c73a7b62d55bee1373e` ON `user`');
    await queryRunner.query('CREATE TABLE `add_email` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `user_id` int NOT NULL, `token` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_9b40d5b4aee8c66745b809b9e0` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user_email` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, UNIQUE INDEX `IDX_f2bff75d7c18f08db06f81934b` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user_phone` (`id` int NOT NULL AUTO_INCREMENT, `phone` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NULL, UNIQUE INDEX `IDX_a9a81a66e65e8af6b4ff4580d0` (`phone`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `email`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `phone`');
    await queryRunner.query('ALTER TABLE `user` ADD `avatar` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `user` ADD `background` varchar(255) NULL');
    await queryRunner.query("ALTER TABLE `user` ADD `language` enum ('english', 'svenska', 'norsk') NOT NULL DEFAULT 'english'");
    await queryRunner.query('ALTER TABLE `user` ADD `identifier_id` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `user` ADD `notify_email` tinyint NOT NULL DEFAULT 1');
    await queryRunner.query('ALTER TABLE `user` ADD `notify_sms` tinyint NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `user` ADD `is_close` tinyint NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `user` ADD `closed_at` timestamp NULL');
    await queryRunner.query('CREATE FULLTEXT INDEX `IDX_e211e4e3c0aa76047889fccbb1` ON `user` (`first_name`, `last_name`)');
    await queryRunner.query('ALTER TABLE `user_email` ADD CONSTRAINT `FK_5fa41dccc4382ff09a32fbe6500` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_phone` ADD CONSTRAINT `FK_879e6347c8b70d3698eeefee76d` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_phone` DROP FOREIGN KEY `FK_879e6347c8b70d3698eeefee76d`');
    await queryRunner.query('ALTER TABLE `user_email` DROP FOREIGN KEY `FK_5fa41dccc4382ff09a32fbe6500`');
    await queryRunner.query('DROP INDEX `IDX_e211e4e3c0aa76047889fccbb1` ON `user`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `closed_at`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `is_close`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `notify_sms`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `notify_email`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `identifier_id`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `language`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `background`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `avatar`');
    await queryRunner.query('ALTER TABLE `user` ADD `phone` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `user` ADD `email` varchar(255) NOT NULL');
    await queryRunner.query('DROP INDEX `IDX_a9a81a66e65e8af6b4ff4580d0` ON `user_phone`');
    await queryRunner.query('DROP TABLE `user_phone`');
    await queryRunner.query('DROP INDEX `IDX_f2bff75d7c18f08db06f81934b` ON `user_email`');
    await queryRunner.query('DROP TABLE `user_email`');
    await queryRunner.query('DROP INDEX `IDX_9b40d5b4aee8c66745b809b9e0` ON `add_email`');
    await queryRunner.query('DROP TABLE `add_email`');
    await queryRunner.query('CREATE FULLTEXT INDEX `IDX_5537e48c73a7b62d55bee1373e` ON `user` (`email`, `first_name`, `last_name`)');
    await queryRunner.query('CREATE UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user` (`email`)');
  }

}
