import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class UpdateOrganisation1566214994073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `organisation_translation` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `admin_welcome_text` varchar(255) NOT NULL, `student_welcome_text` varchar(255) NOT NULL, `organisation_id` int NULL, `language_id` int NULL, INDEX `IDX_e784bc89f258eb28b40d574e17` (`organisation_id`, `language_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `organisation` ADD `admin_full_access` tinyint NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `organisation_translation` ADD CONSTRAINT `FK_fabe7b1ff0c54a6cab923b4df4a` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `organisation_translation` ADD CONSTRAINT `FK_2f115287a406d970f46cff5620d` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `organisation` ADD `logo_image_uri` varchar(255) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `organisation_translation` DROP FOREIGN KEY `FK_2f115287a406d970f46cff5620d`');
    await queryRunner.query('ALTER TABLE `organisation_translation` DROP FOREIGN KEY `FK_fabe7b1ff0c54a6cab923b4df4a`');
    await queryRunner.query('ALTER TABLE `organisation` DROP COLUMN `admin_full_access`');
    await queryRunner.query('DROP INDEX `IDX_e784bc89f258eb28b40d574e17` ON `organisation_translation`');
    await queryRunner.query('DROP TABLE `organisation_translation`');
    await queryRunner.query('ALTER TABLE `organisation` DROP COLUMN `logo_image_uri`');
  }
}
