import {MigrationInterface, QueryRunner} from "typeorm";

export class addCascadeDeleteOnTopics1602687445831 implements MigrationInterface {
    name = 'addCascadeDeleteOnTopics1602687445831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course_topic` DROP FOREIGN KEY `FK_fb95aefc782fa2c60c6f607353e`");
        await queryRunner.query("ALTER TABLE `course_topic` ADD CONSTRAINT `FK_fb95aefc782fa2c60c6f607353e` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course_topic` DROP FOREIGN KEY `FK_fb95aefc782fa2c60c6f607353e`");
        await queryRunner.query("ALTER TABLE `course_topic` ADD CONSTRAINT `FK_fb95aefc782fa2c60c6f607353e` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
