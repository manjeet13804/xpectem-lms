import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullToMaxTriesToAssigment1580464960902 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `assignment` CHANGE `max_tries` `max_tries` int NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `assignment` CHANGE `max_tries` `max_tries` int NOT NULL');
  }
}
