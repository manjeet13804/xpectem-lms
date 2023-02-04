import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddNotification1563342333931 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `notification` (`id` int NOT NULL AUTO_INCREMENT, `heading` varchar(255) NOT NULL, `message` varchar(255) NOT NULL, `type` enum ("system_information", "news", "event", "information", "important_information", "reminder") NOT NULL DEFAULT "information", PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user_notification_notification` (`user_id` int NOT NULL, `notification_id` int NOT NULL, INDEX `IDX_bdbe648e0ad14f67ebe180d5b6` (`user_id`), INDEX `IDX_2cabf2d94b873780f25c0c2e61` (`notification_id`), PRIMARY KEY (`user_id`, `notification_id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `user_notification_notification` ADD CONSTRAINT `FK_bdbe648e0ad14f67ebe180d5b63` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_notification_notification` ADD CONSTRAINT `FK_2cabf2d94b873780f25c0c2e61e` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_notification_notification` DROP FOREIGN KEY `FK_2cabf2d94b873780f25c0c2e61e`');
    await queryRunner.query('ALTER TABLE `user_notification_notification` DROP FOREIGN KEY `FK_bdbe648e0ad14f67ebe180d5b63`');
    await queryRunner.query('DROP INDEX `IDX_2cabf2d94b873780f25c0c2e61` ON `user_notification_notification`');
    await queryRunner.query('DROP INDEX `IDX_bdbe648e0ad14f67ebe180d5b6` ON `user_notification_notification`');
    await queryRunner.query('DROP TABLE `user_notification_notification`');
    await queryRunner.query('DROP TABLE `notification`');
  }

}
