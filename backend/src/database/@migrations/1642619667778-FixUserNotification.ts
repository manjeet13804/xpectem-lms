import {MigrationInterface, QueryRunner} from "typeorm";

export class FixUserNotification1642619667778 implements MigrationInterface {
    name = 'FixUserNotification1642619667778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_notification` ADD `notification_trigger_id` int NULL");
        await queryRunner.query("ALTER TABLE `user_notification` ADD `automatic_reminder_notification_id` int NULL");
        await queryRunner.query("ALTER TABLE `user_notification` CHANGE `is_read` `is_read` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_cd21c3cae50d811afc7fe97dd6b` FOREIGN KEY (`notification_trigger_id`) REFERENCES `notification_triggers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_ebd3bc209632ffa21112b313ae3` FOREIGN KEY (`automatic_reminder_notification_id`) REFERENCES `automatic_reminder_notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_ebd3bc209632ffa21112b313ae3`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_cd21c3cae50d811afc7fe97dd6b`");
        await queryRunner.query("ALTER TABLE `user_notification` CHANGE `is_read` `is_read` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `user_notification` DROP COLUMN `automatic_reminder_notification_id`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP COLUMN `notification_trigger_id`");
    }

}
