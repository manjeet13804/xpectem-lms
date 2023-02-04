import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateLmsGroup1565959787864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `user` CHANGE `language` `language_id` enum ('english', 'svenska', 'norsk') NOT NULL DEFAULT 'english'");
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `language_id`');
    await queryRunner.query('ALTER TABLE `user` ADD `language_id` int NULL');
    await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_948d2ecd168ffdbb308c1bc8a27` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_948d2ecd168ffdbb308c1bc8a27`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `language_id`');
    await queryRunner.query("ALTER TABLE `user` ADD `language_id` enum ('english', 'svenska', 'norsk') NOT NULL DEFAULT 'english'");
    await queryRunner.query("ALTER TABLE `user` CHANGE `language_id` `language` enum ('english', 'svenska', 'norsk') NOT NULL DEFAULT 'english'");
  }
}
