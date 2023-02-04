import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddDeleteCascadeUserCourseRelations1574933407237 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_course_relation` DROP FOREIGN KEY `FK_0d37c99aba6b4b5dac842edeb2b`');
    await queryRunner.query('ALTER TABLE `user_course_relation` DROP FOREIGN KEY `FK_c56927104c232440fa312a50582`');
    await queryRunner.query('ALTER TABLE `user_course_relation` ADD CONSTRAINT `FK_0d37c99aba6b4b5dac842edeb2b` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `user_course_relation` ADD CONSTRAINT `FK_c56927104c232440fa312a50582` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user_course_relation` DROP FOREIGN KEY `FK_c56927104c232440fa312a50582`');
    await queryRunner.query('ALTER TABLE `user_course_relation` DROP FOREIGN KEY `FK_0d37c99aba6b4b5dac842edeb2b`');
    await queryRunner.query(`ALTER TABLE 'user_course_relation' ADD CONSTRAINT 'FK_c56927104c232440fa312a50582'
                                      FOREIGN KEY ('course_id') REFERENCES 'course'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE 'user_course_relation' ADD CONSTRAINT 'FK_0d37c99aba6b4b5dac842edeb2b'
                                      FOREIGN KEY ('user_id') REFERENCES 'user'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
