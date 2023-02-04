import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrderEmailsToLmsGroup1616421074334 implements MigrationInterface {
    name = 'AddOrderEmailsToLmsGroup1616421074334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `lms_group` ADD `order_emails` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `order_emails`");
    }

}
