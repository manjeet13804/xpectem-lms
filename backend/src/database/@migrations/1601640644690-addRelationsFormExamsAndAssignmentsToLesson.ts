import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationsFormExamsAndAssignmentsToLesson1601640644690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `exam` ADD `lesson_id` int NULL");
        await queryRunner.query("ALTER TABLE `assignment` ADD `lesson_id` int NULL");
        await queryRunner.query("ALTER TABLE `exam` ADD CONSTRAINT `FK_80ce1a4883065501bb814df4a20` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `assignment` ADD CONSTRAINT `FK_47895673e717d615389b41a8a15` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `assignment` DROP FOREIGN KEY `FK_47895673e717d615389b41a8a15`");
        await queryRunner.query("ALTER TABLE `exam` DROP FOREIGN KEY `FK_80ce1a4883065501bb814df4a20`");
        await queryRunner.query("ALTER TABLE `assignment` DROP COLUMN `lesson_id`");
        await queryRunner.query("ALTER TABLE `exam` DROP COLUMN `lesson_id`");
    }

}
