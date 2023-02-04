import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAssignmentLogStatus1615891309177 implements MigrationInterface {
    name = 'AddCreatedAssignmentLogStatus1615891309177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `student_assignment_log` CHANGE `status` `status` enum ('created', 'started', 'completed', 'passed', 'failed') NOT NULL DEFAULT 'created'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `student_assignment_log` CHANGE `status` `status` enum ('started', 'completed', 'passed', 'failed') NOT NULL DEFAULT 'started'");
    }
}
