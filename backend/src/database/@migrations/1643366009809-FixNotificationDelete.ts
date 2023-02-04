import {MigrationInterface, QueryRunner} from "typeorm";

export class FixNotificationDelete1643366009809 implements MigrationInterface {
    name = 'FixNotificationDelete1643366009809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` DROP FOREIGN KEY `FK_770f28ebcb8c1c1d7a4548699cd`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_2a83a9b6545c3a5da98dc2a2159`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_b68247ddde93cc6e66a62c0db71`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_b9242e7e73362d6a92d8f62052d`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_d1238543d00b7a5be510a209491`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_6a9d12dd24ff1a7adf5b59279c0`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_cd21c3cae50d811afc7fe97dd6b`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_db8be208a22e59619d1e38cc831`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_ebd3bc209632ffa21112b313ae3`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP COLUMN `notification_triggers_type`");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` ADD `is_delete` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` ADD CONSTRAINT `FK_770f28ebcb8c1c1d7a4548699cd` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_b9242e7e73362d6a92d8f62052d` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_2a83a9b6545c3a5da98dc2a2159` FOREIGN KEY (`notification_triggers_id`) REFERENCES `notification_triggers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_b68247ddde93cc6e66a62c0db71` FOREIGN KEY (`automatic_reminders_id`) REFERENCES `automatic_reminder_notification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_d1238543d00b7a5be510a209491` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_db8be208a22e59619d1e38cc831` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_cd21c3cae50d811afc7fe97dd6b` FOREIGN KEY (`notification_trigger_id`) REFERENCES `notification_triggers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_ebd3bc209632ffa21112b313ae3` FOREIGN KEY (`automatic_reminder_notification_id`) REFERENCES `automatic_reminder_notification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_6a9d12dd24ff1a7adf5b59279c0` FOREIGN KEY (`initializer_admin_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_6a9d12dd24ff1a7adf5b59279c0`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_ebd3bc209632ffa21112b313ae3`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_cd21c3cae50d811afc7fe97dd6b`");
        await queryRunner.query("ALTER TABLE `user_notification` DROP FOREIGN KEY `FK_db8be208a22e59619d1e38cc831`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_d1238543d00b7a5be510a209491`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_b68247ddde93cc6e66a62c0db71`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_2a83a9b6545c3a5da98dc2a2159`");
        await queryRunner.query("ALTER TABLE `notification_translation` DROP FOREIGN KEY `FK_b9242e7e73362d6a92d8f62052d`");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` DROP FOREIGN KEY `FK_770f28ebcb8c1c1d7a4548699cd`");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` DROP COLUMN `is_delete`");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD `notification_triggers_type` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_ebd3bc209632ffa21112b313ae3` FOREIGN KEY (`automatic_reminder_notification_id`) REFERENCES `automatic_reminder_notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_db8be208a22e59619d1e38cc831` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_cd21c3cae50d811afc7fe97dd6b` FOREIGN KEY (`notification_trigger_id`) REFERENCES `notification_triggers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_notification` ADD CONSTRAINT `FK_6a9d12dd24ff1a7adf5b59279c0` FOREIGN KEY (`initializer_admin_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_d1238543d00b7a5be510a209491` FOREIGN KEY (`language_id`) REFERENCES `language`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_b9242e7e73362d6a92d8f62052d` FOREIGN KEY (`notification_id`) REFERENCES `notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_b68247ddde93cc6e66a62c0db71` FOREIGN KEY (`automatic_reminders_id`) REFERENCES `automatic_reminder_notification`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `notification_translation` ADD CONSTRAINT `FK_2a83a9b6545c3a5da98dc2a2159` FOREIGN KEY (`notification_triggers_id`) REFERENCES `notification_triggers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `automatic_reminder_notification` ADD CONSTRAINT `FK_770f28ebcb8c1c1d7a4548699cd` FOREIGN KEY (`lms_group_id`) REFERENCES `lms_group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
