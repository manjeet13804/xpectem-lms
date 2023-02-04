// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationSchedule1587412308283 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query("CREATE TABLE `notification_schedule` (`id` int NOT NULL AUTO_INCREMENT, `heading` varchar(255) NOT NULL, `message` varchar(255) NOT NULL, `send_time` datetime NULL, `type` varchar(255) NULL, `count_days` int NULL, `percent` int NULL, `user_id` int NULL, `admin_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
      await queryRunner.query("ALTER TABLE `notification_schedule` ADD CONSTRAINT `FK_75168ea52e6c97df0fc82fda231` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE `notification_schedule` ADD CONSTRAINT `FK_d6535d639716a3b6e512e9cf23a` FOREIGN KEY (`admin_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query("DROP TABLE `notification_schedule`");
    }
}
