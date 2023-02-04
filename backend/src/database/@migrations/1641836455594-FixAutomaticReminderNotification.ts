import {MigrationInterface, QueryRunner} from "typeorm";

export class FixAutomaticReminderNotification1641836455594 implements MigrationInterface {
    name = 'FixAutomaticReminderNotification1641836455594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` ADD `header` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` ADD `percent` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` DROP COLUMN `percent`");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` DROP COLUMN `header`");
    }

}
