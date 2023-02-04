import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFilesToTopic1607334113069 implements MigrationInterface {
    name = 'AddFilesToTopic1607334113069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course_attachment` ADD `topic_id` int NULL");
        await queryRunner.query("ALTER TABLE `course_attachment` ADD CONSTRAINT `FK_571c4edfc44658e42fe6804d4d0` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course_attachment` DROP FOREIGN KEY `FK_571c4edfc44658e42fe6804d4d0`");
        await queryRunner.query("ALTER TABLE `course_attachment` DROP COLUMN `topic_id`");
    }

}
