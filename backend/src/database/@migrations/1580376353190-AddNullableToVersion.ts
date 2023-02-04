import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableToVersion1580376353190 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `exam` CHANGE `grade_b` `grade_b` int NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `max_points` `max_points` int NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `url` `url` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `time_to_complete` `time_to_complete` int NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `show_report` `show_report` tinyint NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `exam` CHANGE `show_report` `show_report` tinyint NOT NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `time_to_complete` `time_to_complete` int NOT NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `url` `url` varchar(255) NOT NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `max_points` `max_points` int NOT NULL');
    await queryRunner.query('ALTER TABLE `exam` CHANGE `grade_b` `grade_b` int NOT NULL');
  }

}
