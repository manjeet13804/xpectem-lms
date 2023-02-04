import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class DeleteUserCourseRelation1575374110955 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_course_relation` DROP FOREIGN KEY `FK_0d37c99aba6b4b5dac842edeb2b`');
    await queryRunner.query('ALTER TABLE `user_course_relation` DROP FOREIGN KEY `FK_c56927104c232440fa312a50582`');
    await queryRunner.query('DROP INDEX `IDX_a7f73b241eb811dcd459d8c900` ON `user_course_relation`');
    await queryRunner.query('DROP TABLE `user_course_relation`');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `user_course_relation` (' +
                                  '`id` int NOT NULL AUTO_INCREMENT, ' +
                                  '`date_begin` datetime NULL, ' +
                                  '`date_end` datetime NULL, ' +
                                  '`user_id` int NULL, `course_id` int NULL, ' +
                                  '`course_passed` tinyint NOT NULL DEFAULT 0, ' +
                                  'INDEX `IDX_a7f73b241eb811dcd459d8c900` (`user_id`, `course_id`), ' +
                                  'PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `user_course_relation` ADD CONSTRAINT ' +
                                  '`FK_0d37c99aba6b4b5dac842edeb2b` FOREIGN KEY (`user_id`) ' +
                                  'REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_course_relation` ADD CONSTRAINT ' +
                                  '`FK_c56927104c232440fa312a50582` FOREIGN KEY (`course_id`) ' +
                                  'REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
