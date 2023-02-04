import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDateUserLog1599034505023 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `user_log` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `user_log` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(6)'");
  }

}
