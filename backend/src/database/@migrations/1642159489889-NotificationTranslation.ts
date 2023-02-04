import {MigrationInterface, QueryRunner} from "typeorm";

export class NotificationTranslation1642159489889 implements MigrationInterface {
    name = 'NotificationTranslation1642159489889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `notification_translation` (`id` int NOT NULL AUTO_INCREMENT, `message` text NOT NULL, `notification_id` int NULL, `language_id` int NULL, INDEX `IDX_d97647e7e83965645c69f83c33` (`notification_id`, `language_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `notification` DROP COLUMN `message`");
        await queryRunner.query("ALTER TABLE `notification` CHANGE `type` `type` enum ('system_information', 'news', 'information', 'important_information', 'reminder') NOT NULL DEFAULT 'information'");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_b9242e7e73362d6a92d8f62052d` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_d1238543d00b7a5be510a209491` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_d1238543d00b7a5be510a209491`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_b9242e7e73362d6a92d8f62052d`");
        await queryRunner.query("ALTER TABLE `notification` CHANGE `type` `type` enum ('system_information', 'news', 'event', 'information', 'important_information', 'reminder') NOT NULL DEFAULT 'information'");
        await queryRunner.query("ALTER TABLE `notification` ADD `message` varchar(255) NOT NULL");
        await queryRunner.query("DROP INDEX `IDX_d97647e7e83965645c69f83c33` ON `notification_translation`");
        await queryRunner.query("DROP TABLE `notification_translation`");
    }

}
