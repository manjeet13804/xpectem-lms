import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnOriginalNameCommunicationAttachment1578990549521 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `communication_attachment` ADD `original_name` varchar(255) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `communication_attachment` DROP COLUMN `original_name`');
  }

}
