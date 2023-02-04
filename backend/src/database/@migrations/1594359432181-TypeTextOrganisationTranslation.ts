import {MigrationInterface, QueryRunner} from "typeorm";

export class TypeTextOrganisationTranslation1594359432181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `organisation_translation` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `organisation_translation` ADD `description` text NOT NULL");
        await queryRunner.query("ALTER TABLE `organisation_translation` DROP COLUMN `admin_welcome_text`");
        await queryRunner.query("ALTER TABLE `organisation_translation` ADD `admin_welcome_text` text NOT NULL");
        await queryRunner.query("ALTER TABLE `organisation_translation` DROP COLUMN `student_welcome_text`");
        await queryRunner.query("ALTER TABLE `organisation_translation` ADD `student_welcome_text` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `organisation_translation` DROP COLUMN `student_welcome_text`");
        await queryRunner.query("ALTER TABLE `organisation_translation` ADD `student_welcome_text` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `organisation_translation` DROP COLUMN `admin_welcome_text`");
        await queryRunner.query("ALTER TABLE `organisation_translation` ADD `admin_welcome_text` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `organisation_translation` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `organisation_translation` ADD `description` varchar(255) NOT NULL");
    }

}
