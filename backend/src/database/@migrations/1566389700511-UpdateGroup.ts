import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateGroup1566389700511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `group_translation` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `group_id` int NULL, `language_id` int NULL, INDEX `IDX_a004571f09f8f94161d4a3d610` (`group_id`, `language_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `group_translation` ADD CONSTRAINT `FK_23f07dba0897656714c489b32f7` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `group_translation` ADD CONSTRAINT `FK_a3838ae6776d2e5314ccdab5a0a` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `group_translation` DROP FOREIGN KEY `FK_a3838ae6776d2e5314ccdab5a0a`');
    await queryRunner.query('ALTER TABLE `group_translation` DROP FOREIGN KEY `FK_23f07dba0897656714c489b32f7`');
    await queryRunner.query('DROP INDEX `IDX_a004571f09f8f94161d4a3d610` ON `group_translation`');
    await queryRunner.query('DROP TABLE `group_translation`');
  }
}
