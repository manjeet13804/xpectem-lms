import { MigrationInterface, QueryRunner } from 'typeorm';

// tslint:disable:max-line-length
export class AddCourseLogTable1577104427089 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `course_log` (`id` int NOT NULL AUTO_INCREMENT, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by_id` int NULL, `changed_by_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `course` ADD `course_log_id` int NULL');
    await queryRunner.query('ALTER TABLE `course` ADD UNIQUE INDEX `IDX_e46be497d9adca0bac6d649356` (`course_log_id`)');
    await queryRunner.query('CREATE UNIQUE INDEX `REL_e46be497d9adca0bac6d649356` ON `course` (`course_log_id`)');
    await queryRunner.query('ALTER TABLE `course_log` ADD CONSTRAINT `FK_a5baead3c17860c1747e2f6c90c` FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_log` ADD CONSTRAINT `FK_6974dcd50b4153033b98e2a1ef4` FOREIGN KEY (`changed_by_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course` ADD CONSTRAINT `FK_e46be497d9adca0bac6d6493561` FOREIGN KEY (`course_log_id`) REFERENCES `course_log`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `course` DROP FOREIGN KEY `FK_e46be497d9adca0bac6d6493561`');
    await queryRunner.query('ALTER TABLE `course_log` DROP FOREIGN KEY `FK_6974dcd50b4153033b98e2a1ef4`');
    await queryRunner.query('ALTER TABLE `course_log` DROP FOREIGN KEY `FK_a5baead3c17860c1747e2f6c90c`');
    await queryRunner.query('DROP INDEX `REL_e46be497d9adca0bac6d649356` ON `course`');
    await queryRunner.query('ALTER TABLE `course` DROP INDEX `IDX_e46be497d9adca0bac6d649356`');
    await queryRunner.query('ALTER TABLE `course` DROP COLUMN `course_log_id`');
    await queryRunner.query('DROP TABLE `course_log`');
  }
}
