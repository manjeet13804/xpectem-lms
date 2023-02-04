import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddCascadeCourseLog1577429853749 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP FOREIGN KEY `FK_e46be497d9adca0bac6d6493561`');
    await queryRunner.query('DROP INDEX `IDX_e46be497d9adca0bac6d649356` ON `course`');
    await queryRunner.query('DROP INDEX `REL_e46be497d9adca0bac6d649356` ON `course`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `course_log_id`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `certificate_template`');
    await queryRunner.query('ALTER TABLE `course_log` ADD `course_id` int NOT NULL');
    await queryRunner.query('ALTER TABLE `course_log` ADD UNIQUE INDEX `IDX_8494952d48221e1c42fb8c95da` (`course_id`)');
    await queryRunner.query('CREATE UNIQUE INDEX `REL_8494952d48221e1c42fb8c95da` ON `course_log` (`course_id`)');
    await queryRunner.query('ALTER TABLE `course_log` ADD CONSTRAINT `FK_8494952d48221e1c42fb8c95da1` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course_log` DROP FOREIGN KEY `FK_8494952d48221e1c42fb8c95da1`');
    await queryRunner.query('DROP INDEX `REL_8494952d48221e1c42fb8c95da` ON `course_log`');
    await queryRunner.query('ALTER TABLE `course_log` DROP INDEX `IDX_8494952d48221e1c42fb8c95da`');
    await queryRunner.query('ALTER TABLE `course_log` DROP COLUMN `course_id`');
    await queryRunner.query('ALTER TABLE `course` ADD `certificate_template` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `course` ADD `course_log_id` int NULL');
    await queryRunner.query('CREATE UNIQUE INDEX `REL_e46be497d9adca0bac6d649356` ON `course` (`course_log_id`)');
    await queryRunner.query('CREATE UNIQUE INDEX `IDX_e46be497d9adca0bac6d649356` ON `course` (`course_log_id`)');
    await queryRunner.query('ALTER TABLE `course` ADD CONSTRAINT `FK_e46be497d9adca0bac6d6493561` FOREIGN KEY (`course_log_id`) REFERENCES `course_log`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
