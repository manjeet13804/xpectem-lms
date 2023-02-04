import {MigrationInterface, QueryRunner} from "typeorm";

export class AutomaticReminderNotification1638444158393 implements MigrationInterface {
    name = 'AutomaticReminderNotification1638444158393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `automatic_reminder_notification` (`id` int NOT NULL AUTO_INCREMENT, `message` varchar(255) NOT NULL, `enable` tinyint NOT NULL DEFAULT 0, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lms_group_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` ADD CONSTRAINT `FK_770f28ebcb8c1c1d7a4548699cd` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` DROP FOREIGN KEY `FK_770f28ebcb8c1c1d7a4548699cd`");
        await queryRunner.query("DROP TABLE `automatic_reminder_notification`");
    }

}
