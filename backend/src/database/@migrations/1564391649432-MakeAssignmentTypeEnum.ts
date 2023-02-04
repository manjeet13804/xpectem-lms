import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeAssignmentTypeEnum1564391649432 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `assignment` DROP COLUMN `type`');
    await queryRunner.query("ALTER TABLE `assignment` ADD `type` enum ('1', '2') NOT NULL");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `assignment` DROP COLUMN `type`');
    await queryRunner.query('ALTER TABLE `assignment` ADD `type` int NOT NULL');
  }
}
