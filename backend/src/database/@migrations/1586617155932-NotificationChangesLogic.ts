// tslint:disable:max-line-length

import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationChangesLogic1586617155932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `user_notification` (`id` int NOT NULL AUTO_INCREMENT, `is_read` tinyint NOT NULL, `user_id` int NULL, `notification_id` int NULL, `initializer_admin_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `user_notification` ADD CONSTRAINT `FK_ed67d2f825f4103de44ec3b6ba7` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_notification` ADD CONSTRAINT `FK_db8be208a22e59619d1e38cc831` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_notification` ADD CONSTRAINT `FK_6a9d12dd24ff1a7adf5b59279c0` FOREIGN KEY (`initializer_admin_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('DROP TABLE `user_notification_notification`');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `user_notification`');
    await queryRunner.query('CREATE TABLE `user_notification_notification` (`user_id` int NOT NULL, `notification_id` int NOT NULL, INDEX `IDX_bdbe648e0ad14f67ebe180d5b6` (`user_id`), INDEX `IDX_2cabf2d94b873780f25c0c2e61` (`notification_id`), PRIMARY KEY (`user_id`, `notification_id`)) ENGINE=InnoDB');
  }

}
