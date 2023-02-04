import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTypeColumnLmsGroup1592833598296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `access_expire_at`");
        await queryRunner.query("ALTER TABLE `lms_group` ADD `access_expire_at` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `lms_group` DROP COLUMN `access_expire_at`");
        await queryRunner.query("ALTER TABLE `lms_group` ADD `access_expire_at` timestamp(6) NOT NULL");
    }

}
