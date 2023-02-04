import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnsPersonEmployee1574761670936 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user` ADD `person_number` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `user` ADD UNIQUE INDEX `IDX_76d10e2448c9718bda6d580cdf` (`person_number`)');
    await queryRunner.query('ALTER TABLE `user` ADD `employee_number` varchar(255) NULL');
    await queryRunner.query('ALTER TABLE `user` ADD UNIQUE INDEX `IDX_f74df4b59595d4ecd5e687f6e5` (`employee_number`)');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `user` DROP INDEX `IDX_f74df4b59595d4ecd5e687f6e5`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `employee_number`');
    await queryRunner.query('ALTER TABLE `user` DROP INDEX `IDX_76d10e2448c9718bda6d580cdf`');
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `person_number`');
  }
}
