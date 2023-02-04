import {MigrationInterface, QueryRunner} from "typeorm";

export class FixNotificationTranslation1643203095271 implements MigrationInterface {
    name = 'FixNotificationTranslation1643203095271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `notification_triggers` DROP COLUMN `message`");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD `notification_triggers_id` int NULL");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD `automatic_reminders_id` int NULL");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_2a83a9b6545c3a5da98dc2a2159` FOREIGN KEY (`notification_triggers_id`) REFERENCES `notification_triggers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_b68247ddde93cc6e66a62c0db71` FOREIGN KEY (`automatic_reminders_id`) REFERENCES `automatic_reminder_notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_b68247ddde93cc6e66a62c0db71`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_2a83a9b6545c3a5da98dc2a2159`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP COLUMN `automatic_reminders_id`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP COLUMN `notification_triggers_id`");
        await queryRunner.query("ALTER TABLE `notification_triggers` ADD `message` varchar(255) NOT NULL");
    }

}
