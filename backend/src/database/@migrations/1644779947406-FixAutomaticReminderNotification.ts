import {MigrationInterface, QueryRunner} from "typeorm";

export class FixAutomaticReminderNotification1644779947406 implements MigrationInterface {
    name = 'FixAutomaticReminderNotification1644779947406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_notification` ADD `course_id` int NULL");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_df8afae43fb913ff8f17c1eb48b` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_df8afae43fb913ff8f17c1eb48b`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP COLUMN `course_id`");
    }

}
