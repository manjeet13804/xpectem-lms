import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsStepByStepTopicsColumnToCourses1606721025622 implements MigrationInterface {
    name = 'AddIsStepByStepTopicsColumnToCourses1606721025622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` ADD `is_step_by_step_topics` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` DROP COLUMN `is_step_by_step_topics`");
    }

}
