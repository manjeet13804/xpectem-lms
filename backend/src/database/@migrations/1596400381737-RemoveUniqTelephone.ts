import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqTelephone1596400381737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP INDEX `IDX_a9a81a66e65e8af6b4ff4580d0` ON `user_phone`");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("CREATE UNIQUE INDEX `IDX_a9a81a66e65e8af6b4ff4580d0` ON `user_phone` (`phone`)");
  }
}
