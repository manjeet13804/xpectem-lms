// tslint:disable:max-line-length
import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationTriggers1587311351768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("CREATE TABLE `notification_triggers` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, `heading` varchar(255) NOT NULL, `message` varchar(255) NOT NULL, `additional_data` varchar(255), `admin_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    await queryRunner.query("ALTER TABLE `notification_triggers` ADD CONSTRAINT `FK_f402a93a7e794a44d55ef765bdd` FOREIGN KEY (`admin_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE `notification_triggers`");
  }
}
