import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCommunicationTables1610456585666 implements MigrationInterface {
    name = 'UpdateCommunicationTables1610456585666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP FOREIGN KEY `FK_947f71bbebaac361c6c4832ae97`");
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `communication_id`");
        await queryRunner.query("ALTER TABLE `communication_message` DROP COLUMN `is_checked`");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `is_closed` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `course_id` int NULL");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `accepter_id` int NULL");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD CONSTRAINT `FK_10e07f71cca91b79f53a3eb7a6a` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD CONSTRAINT `FK_4f8abc54916ebfa0f9ce2e702c7` FOREIGN KEY (`accepter_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP FOREIGN KEY `FK_4f8abc54916ebfa0f9ce2e702c7`");
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP FOREIGN KEY `FK_10e07f71cca91b79f53a3eb7a6a`");
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `accepter_id`");
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `course_id`");
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `is_closed`");
        await queryRunner.query("ALTER TABLE `communication_message` ADD `is_checked` tinyint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `communication_id` int NULL");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD CONSTRAINT `FK_947f71bbebaac361c6c4832ae97` FOREIGN KEY (`communication_id`) REFERENCES `communication`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
