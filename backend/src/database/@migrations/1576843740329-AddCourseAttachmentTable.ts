import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddCourseAttachmentTable1576843740329 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `file_topics` (`id` int NOT NULL AUTO_INCREMENT, `header` varchar(255) NOT NULL, `created_at` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course_attachment` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `created_at` datetime NOT NULL, `file_topics_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `course-course_attachment` (`course_id` int NOT NULL, `course_attachment_id` int NOT NULL, INDEX `IDX_34ad09382a815d822c2855983b` (`course_id`), INDEX `IDX_5a76fb43a0e1cc77eb94f08a17` (`course_attachment_id`), PRIMARY KEY (`course_id`, `course_attachment_id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `course_attachment` ADD CONSTRAINT `FK_c8593e325aa658bcc85897d1966` FOREIGN KEY (`file_topics_id`) REFERENCES `file_topics`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course-course_attachment` ADD CONSTRAINT `FK_34ad09382a815d822c2855983bc` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course-course_attachment` ADD CONSTRAINT `FK_5a76fb43a0e1cc77eb94f08a177` FOREIGN KEY (`course_attachment_id`) REFERENCES `course_attachment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course-course_attachment` DROP FOREIGN KEY `FK_5a76fb43a0e1cc77eb94f08a177`');
    await queryRunner.query('ALTER TABLE `course-course_attachment` DROP FOREIGN KEY `FK_34ad09382a815d822c2855983bc`');
    await queryRunner.query('ALTER TABLE `course_attachment` DROP FOREIGN KEY `FK_c8593e325aa658bcc85897d1966`');
    await queryRunner.query('DROP INDEX `IDX_5a76fb43a0e1cc77eb94f08a17` ON `course-course_attachment`');
    await queryRunner.query('DROP INDEX `IDX_34ad09382a815d822c2855983b` ON `course-course_attachment`');
    await queryRunner.query('DROP TABLE `course-course_attachment`');
    await queryRunner.query('DROP TABLE `course_attachment`');
    await queryRunner.query('DROP TABLE `file_topics`');
  }
}
