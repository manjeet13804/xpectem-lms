import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetCourseColumnsNullable1576759712382 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` CHANGE `version` `version` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `content_list` `content_list` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `short_description` `short_description` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `description` `description` text NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `examination` `examination` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `image_uri` `image_uri` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `is_certified` `is_certified` tinyint NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `course` CHANGE `certified_info` `certified_info` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `is_linear` `is_linear` tinyint NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `is_consistently` `is_consistently` tinyint NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `previous_knowledge` `previous_knowledge` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `price` `price` int NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `result_url` `result_url` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `target_group` `target_group` text NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `length` `length` text NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `time_send_reminders` `time_send_reminders` tinyint NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `media_info` `media_info` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `media_has_physical` `media_has_physical` tinyint NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `time_complete` `time_complete` int NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `study_plan_student_access` `study_plan_student_access` tinyint NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `study_plan_approximately_days` `study_plan_approximately_days` int NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` CHANGE `result_url` `result_url` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `price` `price` int NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `previous_knowledge` `previous_knowledge` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `is_consistently` `is_consistently` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `is_linear` `is_linear` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `certified_info` `certified_info` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `is_certified` `is_certified` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `image_uri` `image_uri` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `examination` `examination` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `description` `description` text NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `short_description` `short_description` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `content_list` `content_list` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `version` `version` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `length` `length` text NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `target_group` `target_group` text NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `time_send_reminders` `time_send_reminders` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `study_plan_approximately_days` `study_plan_approximately_days` int NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `study_plan_student_access` `study_plan_student_access` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `time_complete` `time_complete` int NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `media_has_physical` `media_has_physical` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `course` CHANGE `media_info` `media_info` varchar(255) NOT NULL');
  }
}
