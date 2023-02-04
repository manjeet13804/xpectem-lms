import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddRelationsFormLearn1574431428672 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE IF NOT EXISTS `course-assignment` (`course_id` int NOT NULL, `assignment_id` int NOT NULL, INDEX `IDX_8c5e053d0e403564bf58f22ef6` (`course_id`), INDEX `IDX_41d89c65d5a504b5e276df52a0` (`assignment_id`), PRIMARY KEY (`course_id`, `assignment_id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE IF NOT EXISTS `course-exam` (`course_id` int NOT NULL, `exam_id` int NOT NULL, INDEX `IDX_0ac5ec751db36905de54d1ba42` (`course_id`), INDEX `IDX_136c40cd79f6b2e978f79fca73` (`exam_id`), PRIMARY KEY (`course_id`, `exam_id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `course-assignment` ADD CONSTRAINT `FK_8c5e053d0e403564bf58f22ef6d` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course-assignment` ADD CONSTRAINT `FK_41d89c65d5a504b5e276df52a0a` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course-exam` ADD CONSTRAINT `FK_0ac5ec751db36905de54d1ba42f` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course-exam` ADD CONSTRAINT `FK_136c40cd79f6b2e978f79fca73b` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course-exam` DROP FOREIGN KEY `FK_136c40cd79f6b2e978f79fca73b`');
    await queryRunner.query('ALTER TABLE `course-exam` DROP FOREIGN KEY `FK_0ac5ec751db36905de54d1ba42f`');
    await queryRunner.query('ALTER TABLE `course-assignment` DROP FOREIGN KEY `FK_41d89c65d5a504b5e276df52a0a`');
    await queryRunner.query('ALTER TABLE `course-assignment` DROP FOREIGN KEY `FK_8c5e053d0e403564bf58f22ef6d`');
    await queryRunner.query('DROP INDEX `IDX_136c40cd79f6b2e978f79fca73` ON `course-exam`');
    await queryRunner.query('DROP INDEX `IDX_0ac5ec751db36905de54d1ba42` ON `course-exam`');
    await queryRunner.query('DROP TABLE `course-exam`');
    await queryRunner.query('DROP INDEX `IDX_41d89c65d5a504b5e276df52a0` ON `course-assignment`');
    await queryRunner.query('DROP INDEX `IDX_8c5e053d0e403564bf58f22ef6` ON `course-assignment`');
    await queryRunner.query('DROP TABLE `course-assignment`');
  }
}
