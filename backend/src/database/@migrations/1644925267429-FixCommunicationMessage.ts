import {MigrationInterface, QueryRunner} from "typeorm";

export class FixCommunicationMessage1644925267429 implements MigrationInterface {
    name = 'FixCommunicationMessage1644925267429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `message`");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `message` text NOT NULL");
        await queryRunner.query("ALTER TABLE `communication_message` DROP COLUMN `message`");
        await queryRunner.query("ALTER TABLE `communication_message` ADD `message` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_message` DROP COLUMN `message`");
        await queryRunner.query("ALTER TABLE `communication_message` ADD `message` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `message`");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `message` varchar(255) NOT NULL");
    }

}
