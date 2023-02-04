import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddAssignmentsAndStudyPlan1561990890994 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` CHANGE `study_plan_approximately_time` `study_plan_approximately_days` int NOT NULL');
    await queryRunner.query('ALTER TABLE `student_assignment_log` DROP COLUMN `is_approved`');
    await queryRunner.query("ALTER TABLE `student_assignment_log` ADD `status` enum ('started', 'completed', 'passed', 'failed') NOT NULL DEFAULT 'started'");
    await queryRunner.query('ALTER TABLE `student_assignment_log` ADD `approved_at` datetime NULL');
    await queryRunner.query('ALTER TABLE `assignment` ADD `type` int NOT NULL');
    await queryRunner.query('ALTER TABLE `course_student` ADD `study_plan_wished_done_date` datetime NULL');
    await queryRunner.query('ALTER TABLE `course_student` ADD `study_plan_hours_per_week` int NULL');
    await queryRunner.query('ALTER TABLE `student_assignment_log` CHANGE `answers` `answers` text NULL');
    await queryRunner.query('ALTER TABLE `student_assignment_log` CHANGE `points` `points` int NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_a049c933e37a70b091f5cbf7cf4`');
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_c34eb3d7ecb91ecb57645767b6b`');
    await queryRunner.query('ALTER TABLE `course_student` DROP PRIMARY KEY');
    await queryRunner.query('ALTER TABLE `course_student` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_a049c933e37a70b091f5cbf7cf4` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_c34eb3d7ecb91ecb57645767b6b` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_c34eb3d7ecb91ecb57645767b6b`');
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_a049c933e37a70b091f5cbf7cf4`');
    await queryRunner.query('ALTER TABLE `course_student` DROP COLUMN `id`');
    await queryRunner.query('ALTER TABLE `course_student` ADD PRIMARY KEY (`user_id`, `course_id`)');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_c34eb3d7ecb91ecb57645767b6b` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_a049c933e37a70b091f5cbf7cf4` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `student_assignment_log` CHANGE `points` `points` int NOT NULL');
    await queryRunner.query('ALTER TABLE `student_assignment_log` CHANGE `answers` `answers` text NOT NULL');
    await queryRunner.query('ALTER TABLE `course_student` DROP COLUMN `study_plan_hours_per_week`');
    await queryRunner.query('ALTER TABLE `course_student` DROP COLUMN `study_plan_wished_done_date`');
    await queryRunner.query('ALTER TABLE `assignment` DROP COLUMN `type`');
    await queryRunner.query('ALTER TABLE `student_assignment_log` DROP COLUMN `approved_at`');
    await queryRunner.query('ALTER TABLE `student_assignment_log` DROP COLUMN `status`');
    await queryRunner.query('ALTER TABLE `student_assignment_log` ADD `is_approved` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `study_plan_approximately_days` `study_plan_approximately_time` int NOT NULL');
  }
}
