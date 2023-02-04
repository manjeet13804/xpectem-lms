import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class Initial1561964746565 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `organisation` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_d9428f9c8e3052d6617e3aab0e` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `student_lesson_log` (`id` int NOT NULL AUTO_INCREMENT, `viewed_at` datetime NOT NULL, `student_id` int NULL, `lesson_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `lesson` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `order` int NOT NULL, `topic_id` int NULL, UNIQUE INDEX `IDX_f30263482fe7f407d491487826` (`topic_id`, `order`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `student_assignment_log` (`id` int NOT NULL AUTO_INCREMENT, `answers` text NOT NULL, `points` int NOT NULL, `is_approved` tinyint NOT NULL, `started_at` datetime NOT NULL, `completed_at` datetime NULL, `student_id` int NULL, `assignment_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `assignment` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `version` varchar(255) NOT NULL, `description` varchar(255) NULL, `url` varchar(255) NOT NULL, `max_tries` int NOT NULL, `order` int NOT NULL, `topic_id` int NULL, UNIQUE INDEX `IDX_3372b809eaa4daffdd0d9261a7` (`topic_id`, `order`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `student_exam_log` (`id` int NOT NULL AUTO_INCREMENT, `answers` text NOT NULL, `points` int NOT NULL, `grade` varchar(255) NOT NULL, `started_at` datetime NOT NULL, `completed_at` datetime NULL, `student_id` int NULL, `exam_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `exam` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `version` varchar(255) NOT NULL, `max_tries` int NOT NULL, `grade_a` int NOT NULL, `grade_b` int NOT NULL, `grade_c` int NOT NULL, `max_points` int NOT NULL, `url` varchar(255) NOT NULL, `time_to_complete` int NOT NULL, `show_report` tinyint NOT NULL, `order` int NOT NULL, `topic_id` int NULL, UNIQUE INDEX `IDX_2472bd2e222eaf8da2ec85fb9d` (`topic_id`, `order`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `topic` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `version` varchar(255) NOT NULL, `description` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course_topic` (`order` int NOT NULL, `topic_id` int NOT NULL, `course_id` int NOT NULL, UNIQUE INDEX `IDX_b72d89125c2b4a1e7f5ec0dcd4` (`course_id`, `topic_id`), PRIMARY KEY (`order`, `topic_id`, `course_id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course_student` (`start_at` datetime NOT NULL, `done_at` datetime NULL, `points` int NOT NULL DEFAULT 0, `certificate_url` varchar(255) NULL, `user_id` int NOT NULL, `course_id` int NOT NULL, PRIMARY KEY (`user_id`, `course_id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course_link` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(255) NOT NULL, `order` int NOT NULL, `course_id` int NULL, UNIQUE INDEX `IDX_8c4dcabfcc49ee1c15ea8737bc` (`course_id`, `order`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query("CREATE TABLE `course` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `version` varchar(255) NOT NULL, `content_list` varchar(255) NOT NULL, `short_description` varchar(255) NOT NULL, `description` text NOT NULL, `examination` varchar(255) NOT NULL, `image_uri` varchar(255) NOT NULL, `language` varchar(255) NOT NULL, `is_certified` tinyint NOT NULL, `certified_info` varchar(255) NOT NULL, `is_linear` tinyint NOT NULL, `other_info` text NULL, `previous_knowledge` varchar(255) NOT NULL, `price` int NOT NULL, `result_url` varchar(255) NOT NULL, `system_requirements` text NULL, `target_group` text NOT NULL, `length` text NOT NULL, `welcome_file_url` varchar(255) NULL, `status` enum ('unpublished', 'published', 'archived') NOT NULL DEFAULT 'unpublished', `certificate_grade_text` text NULL, `certificate_dont_show_exams` tinyint NOT NULL, `certificate_signatures` varchar(255) NOT NULL, `certificate_course_name` varchar(255) NULL, `certificate_content` text NULL, `certificate_url` varchar(255) NOT NULL, `media_info` varchar(255) NOT NULL, `media_has_physical` tinyint NOT NULL, `time_complete` int NOT NULL, `time_access` int NULL, `time_send_reminders` tinyint NOT NULL, `time_extra_info` text NULL, `study_plan_student_access` tinyint NOT NULL, `study_plan_approximately_time` int NOT NULL, `welcome_email_from_email` varchar(255) NOT NULL, `welcome_email_from_name` varchar(255) NOT NULL, `welcome_email_content` text NOT NULL, `welcome_email_url` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query('CREATE TABLE `group` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `organisation_id` int NULL, UNIQUE INDEX `IDX_8a45300fd825918f3b40195fbd` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `phone` varchar(255) NULL, `postal_code` varchar(255) NULL, `postal_address` varchar(255) NULL, `street_address` varchar(255) NULL, `roles` enum ('xpectum', 'course_creator', 'super_admin', 'admin', 'tutor', 'editor', 'user') NOT NULL DEFAULT 'user', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), FULLTEXT INDEX `IDX_5537e48c73a7b62d55bee1373e` (`email`, `first_name`, `last_name`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query('CREATE TABLE `forgot_password` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `token` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `group_course` (`course_id` int NOT NULL, `group_id` int NOT NULL, INDEX `IDX_c9762a3da4695e1ccd34682c54` (`course_id`), INDEX `IDX_a5661d287a6656c4d41e766c4a` (`group_id`), PRIMARY KEY (`course_id`, `group_id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course_tutors_user` (`course_id` int NOT NULL, `user_id` int NOT NULL, INDEX `IDX_7b21048c08d14e1201791d4ab6` (`course_id`), INDEX `IDX_f9041c5e6fda0bbe97ed1b0926` (`user_id`), PRIMARY KEY (`course_id`, `user_id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course_categories_course_category` (`course_id` int NOT NULL, `course_category_id` int NOT NULL, INDEX `IDX_3a202e7fa1a8111a0eb7b79a95` (`course_id`), INDEX `IDX_74c71a405f57c03837c58ce30f` (`course_category_id`), PRIMARY KEY (`course_id`, `course_category_id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `user_groups_group` (`user_id` int NOT NULL, `group_id` int NOT NULL, INDEX `IDX_0c0dde263667bb856fbefdfd77` (`user_id`), INDEX `IDX_1925ed38f100660d9a573f1dd5` (`group_id`), PRIMARY KEY (`user_id`, `group_id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `student_lesson_log` ADD CONSTRAINT `FK_aabfa122c0f5fefbdb7c5a85241` FOREIGN KEY (`student_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `student_lesson_log` ADD CONSTRAINT `FK_3fe20e099999628c68310eb3043` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `lesson` ADD CONSTRAINT `FK_c5b7df34f749fa9f255adf59c8e` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `student_assignment_log` ADD CONSTRAINT `FK_752a40a57251a437337f1b139ab` FOREIGN KEY (`student_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `student_assignment_log` ADD CONSTRAINT `FK_0f28071a4c459d44c28b797c9f3` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `assignment` ADD CONSTRAINT `FK_b66b9995579843f5b39bc5cd342` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `student_exam_log` ADD CONSTRAINT `FK_7101a180edebde9e7881ef58d10` FOREIGN KEY (`student_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `student_exam_log` ADD CONSTRAINT `FK_088669e66bf34df37004315bbf5` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `exam` ADD CONSTRAINT `FK_172764ee8172008a93b5fc42959` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_topic` ADD CONSTRAINT `FK_fb95aefc782fa2c60c6f607353e` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_topic` ADD CONSTRAINT `FK_8d2bc2e6f20363ef788cdcc0699` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_a049c933e37a70b091f5cbf7cf4` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_c34eb3d7ecb91ecb57645767b6b` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_link` ADD CONSTRAINT `FK_b8f11982c1b0dc2a0bbc1f7c765` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `group` ADD CONSTRAINT `FK_bd933c27b9c35682d687c787b2d` FOREIGN KEY (`organisation_id`) REFERENCES `organisation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `forgot_password` ADD CONSTRAINT `FK_93500e0a028c94b4c54ecaa6351` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `group_course` ADD CONSTRAINT `FK_c9762a3da4695e1ccd34682c547` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `group_course` ADD CONSTRAINT `FK_a5661d287a6656c4d41e766c4a1` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_tutors_user` ADD CONSTRAINT `FK_7b21048c08d14e1201791d4ab67` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_tutors_user` ADD CONSTRAINT `FK_f9041c5e6fda0bbe97ed1b09262` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_categories_course_category` ADD CONSTRAINT `FK_3a202e7fa1a8111a0eb7b79a95b` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_categories_course_category` ADD CONSTRAINT `FK_74c71a405f57c03837c58ce30f7` FOREIGN KEY (`course_category_id`) REFERENCES `course_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_groups_group` ADD CONSTRAINT `FK_0c0dde263667bb856fbefdfd77e` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_groups_group` ADD CONSTRAINT `FK_1925ed38f100660d9a573f1dd5f` FOREIGN KEY (`group_id`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_groups_group` DROP FOREIGN KEY `FK_1925ed38f100660d9a573f1dd5f`');
    await queryRunner.query('ALTER TABLE `user_groups_group` DROP FOREIGN KEY `FK_0c0dde263667bb856fbefdfd77e`');
    await queryRunner.query('ALTER TABLE `course_categories_course_category` DROP FOREIGN KEY `FK_74c71a405f57c03837c58ce30f7`');
    await queryRunner.query('ALTER TABLE `course_categories_course_category` DROP FOREIGN KEY `FK_3a202e7fa1a8111a0eb7b79a95b`');
    await queryRunner.query('ALTER TABLE `course_tutors_user` DROP FOREIGN KEY `FK_f9041c5e6fda0bbe97ed1b09262`');
    await queryRunner.query('ALTER TABLE `course_tutors_user` DROP FOREIGN KEY `FK_7b21048c08d14e1201791d4ab67`');
    await queryRunner.query('ALTER TABLE `group_course` DROP FOREIGN KEY `FK_a5661d287a6656c4d41e766c4a1`');
    await queryRunner.query('ALTER TABLE `group_course` DROP FOREIGN KEY `FK_c9762a3da4695e1ccd34682c547`');
    await queryRunner.query('ALTER TABLE `forgot_password` DROP FOREIGN KEY `FK_93500e0a028c94b4c54ecaa6351`');
    await queryRunner.query('ALTER TABLE `group` DROP FOREIGN KEY `FK_bd933c27b9c35682d687c787b2d`');
    await queryRunner.query('ALTER TABLE `course_link` DROP FOREIGN KEY `FK_b8f11982c1b0dc2a0bbc1f7c765`');
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_c34eb3d7ecb91ecb57645767b6b`');
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_a049c933e37a70b091f5cbf7cf4`');
    await queryRunner.query('ALTER TABLE `course_topic` DROP FOREIGN KEY `FK_8d2bc2e6f20363ef788cdcc0699`');
    await queryRunner.query('ALTER TABLE `course_topic` DROP FOREIGN KEY `FK_fb95aefc782fa2c60c6f607353e`');
    await queryRunner.query('ALTER TABLE `exam` DROP FOREIGN KEY `FK_172764ee8172008a93b5fc42959`');
    await queryRunner.query('ALTER TABLE `student_exam_log` DROP FOREIGN KEY `FK_088669e66bf34df37004315bbf5`');
    await queryRunner.query('ALTER TABLE `student_exam_log` DROP FOREIGN KEY `FK_7101a180edebde9e7881ef58d10`');
    await queryRunner.query('ALTER TABLE `assignment` DROP FOREIGN KEY `FK_b66b9995579843f5b39bc5cd342`');
    await queryRunner.query('ALTER TABLE `student_assignment_log` DROP FOREIGN KEY `FK_0f28071a4c459d44c28b797c9f3`');
    await queryRunner.query('ALTER TABLE `student_assignment_log` DROP FOREIGN KEY `FK_752a40a57251a437337f1b139ab`');
    await queryRunner.query('ALTER TABLE `lesson` DROP FOREIGN KEY `FK_c5b7df34f749fa9f255adf59c8e`');
    await queryRunner.query('ALTER TABLE `student_lesson_log` DROP FOREIGN KEY `FK_3fe20e099999628c68310eb3043`');
    await queryRunner.query('ALTER TABLE `student_lesson_log` DROP FOREIGN KEY `FK_aabfa122c0f5fefbdb7c5a85241`');
    await queryRunner.query('DROP INDEX `IDX_1925ed38f100660d9a573f1dd5` ON `user_groups_group`');
    await queryRunner.query('DROP INDEX `IDX_0c0dde263667bb856fbefdfd77` ON `user_groups_group`');
    await queryRunner.query('DROP TABLE `user_groups_group`');
    await queryRunner.query('DROP INDEX `IDX_74c71a405f57c03837c58ce30f` ON `course_categories_course_category`');
    await queryRunner.query('DROP INDEX `IDX_3a202e7fa1a8111a0eb7b79a95` ON `course_categories_course_category`');
    await queryRunner.query('DROP TABLE `course_categories_course_category`');
    await queryRunner.query('DROP INDEX `IDX_f9041c5e6fda0bbe97ed1b0926` ON `course_tutors_user`');
    await queryRunner.query('DROP INDEX `IDX_7b21048c08d14e1201791d4ab6` ON `course_tutors_user`');
    await queryRunner.query('DROP TABLE `course_tutors_user`');
    await queryRunner.query('DROP INDEX `IDX_a5661d287a6656c4d41e766c4a` ON `group_course`');
    await queryRunner.query('DROP INDEX `IDX_c9762a3da4695e1ccd34682c54` ON `group_course`');
    await queryRunner.query('DROP TABLE `group_course`');
    await queryRunner.query('DROP TABLE `forgot_password`');
    await queryRunner.query('DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`');
    await queryRunner.query('DROP INDEX `IDX_5537e48c73a7b62d55bee1373e` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP INDEX `IDX_8a45300fd825918f3b40195fbd` ON `group`');
    await queryRunner.query('DROP TABLE `group`');
    await queryRunner.query('DROP TABLE `course`');
    await queryRunner.query('DROP INDEX `IDX_8c4dcabfcc49ee1c15ea8737bc` ON `course_link`');
    await queryRunner.query('DROP TABLE `course_link`');
    await queryRunner.query('DROP TABLE `course_student`');
    await queryRunner.query('DROP TABLE `course_category`');
    await queryRunner.query('DROP INDEX `IDX_b72d89125c2b4a1e7f5ec0dcd4` ON `course_topic`');
    await queryRunner.query('DROP TABLE `course_topic`');
    await queryRunner.query('DROP TABLE `topic`');
    await queryRunner.query('DROP INDEX `IDX_2472bd2e222eaf8da2ec85fb9d` ON `exam`');
    await queryRunner.query('DROP TABLE `exam`');
    await queryRunner.query('DROP TABLE `student_exam_log`');
    await queryRunner.query('DROP INDEX `IDX_3372b809eaa4daffdd0d9261a7` ON `assignment`');
    await queryRunner.query('DROP TABLE `assignment`');
    await queryRunner.query('DROP TABLE `student_assignment_log`');
    await queryRunner.query('DROP INDEX `IDX_f30263482fe7f407d491487826` ON `lesson`');
    await queryRunner.query('DROP TABLE `lesson`');
    await queryRunner.query('DROP TABLE `student_lesson_log`');
    await queryRunner.query('DROP INDEX `IDX_d9428f9c8e3052d6617e3aab0e` ON `organisation`');
    await queryRunner.query('DROP TABLE `organisation`');
  }

}
