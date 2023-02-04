import {MigrationInterface, QueryRunner} from "typeorm";

export class CommunicationMessage1630931873089 implements MigrationInterface {
  name = 'CommunicationMessage1630931873089'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `communication_message` ADD `is_admin_checked` tinyint NOT NULL DEFAULT 0");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `communication_message` DROP COLUMN `is_admin_checked`");
  }

}
