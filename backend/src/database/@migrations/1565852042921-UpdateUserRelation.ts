import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable
export class UpdateUserRelation1565852042921 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `user_organisations_organisation` (`user_id` int NOT NULL, `organisation_id` int NOT NULL, INDEX `IDX_1cd40d4813f21edaae8bb30e2e` (`user_id`), INDEX `IDX_60ffc970b3610370402a93f687` (`organisation_id`), PRIMARY KEY (`user_id`, `organisation_id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user_lms_groups_lms_group` (`user_id` int NOT NULL, `lms_group_id` int NOT NULL, INDEX `IDX_9807b106ec7d623e90c4ee8bcf` (`user_id`), INDEX `IDX_79386fd362f6c178a5d410a5c5` (`lms_group_id`), PRIMARY KEY (`user_id`, `lms_group_id`)) ENGINE=InnoDB');
    await queryRunner.query("ALTER TABLE `notification` CHANGE `type` `type` enum ('system_information', 'news', 'event', 'information', 'important_information', 'reminder') NOT NULL DEFAULT 'information'");
    await queryRunner.query('ALTER TABLE `user_organisations_organisation` ADD CONSTRAINT `FK_1cd40d4813f21edaae8bb30e2e5` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_organisations_organisation` ADD CONSTRAINT `FK_60ffc970b3610370402a93f6876` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_lms_groups_lms_group` ADD CONSTRAINT `FK_9807b106ec7d623e90c4ee8bcfe` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_lms_groups_lms_group` ADD CONSTRAINT `FK_79386fd362f6c178a5d410a5c51` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_lms_groups_lms_group` DROP FOREIGN KEY `FK_79386fd362f6c178a5d410a5c51`');
    await queryRunner.query('ALTER TABLE `user_lms_groups_lms_group` DROP FOREIGN KEY `FK_9807b106ec7d623e90c4ee8bcfe`');
    await queryRunner.query('ALTER TABLE `user_organisations_organisation` DROP FOREIGN KEY `FK_60ffc970b3610370402a93f6876`');
    await queryRunner.query('ALTER TABLE `user_organisations_organisation` DROP FOREIGN KEY `FK_1cd40d4813f21edaae8bb30e2e5`');
    await queryRunner.query("ALTER TABLE `notification` CHANGE `type` `type` enum ('new_message') NOT NULL");
    await queryRunner.query('DROP INDEX `IDX_79386fd362f6c178a5d410a5c5` ON `user_lms_groups_lms_group`');
    await queryRunner.query('DROP INDEX `IDX_9807b106ec7d623e90c4ee8bcf` ON `user_lms_groups_lms_group`');
    await queryRunner.query('DROP TABLE `user_lms_groups_lms_group`');
    await queryRunner.query('DROP INDEX `IDX_60ffc970b3610370402a93f687` ON `user_organisations_organisation`');
    await queryRunner.query('DROP INDEX `IDX_1cd40d4813f21edaae8bb30e2e` ON `user_organisations_organisation`');
    await queryRunner.query('DROP TABLE `user_organisations_organisation`');
  }

}
