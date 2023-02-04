import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailAndNameSenderWelcomeEmailCourse1606737066576 implements MigrationInterface {
    name = 'AddEmailAndNameSenderWelcomeEmailCourse1606737066576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` ADD `sender_email` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `course` ADD `sender_name` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` DROP COLUMN `sender_name`");
        await queryRunner.query("ALTER TABLE `course` DROP COLUMN `sender_email`");
    }

}
