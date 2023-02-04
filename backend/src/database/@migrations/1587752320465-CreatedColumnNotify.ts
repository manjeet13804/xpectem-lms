import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedColumnNotify1587752320465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_notification` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `notification_triggers` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `notification_triggers` DROP COLUMN `created_at`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP COLUMN `created_at`");
    }

}
