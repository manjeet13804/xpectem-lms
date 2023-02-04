import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddCascadeCourseStudent1577430436216 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_c34eb3d7ecb91ecb57645767b6b`');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_c34eb3d7ecb91ecb57645767b6b` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course_student` DROP FOREIGN KEY `FK_c34eb3d7ecb91ecb57645767b6b`');
    await queryRunner.query('ALTER TABLE `course_student` ADD CONSTRAINT `FK_c34eb3d7ecb91ecb57645767b6b` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }
}
