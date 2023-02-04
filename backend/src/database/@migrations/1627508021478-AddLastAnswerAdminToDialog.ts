import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLastAnswerAdminToDialog1627508021478 implements MigrationInterface {
    name = 'AddLastAnswerAdminToDialog1627508021478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD `last_answer_admin_id` int NULL");
        await queryRunner.query("ALTER TABLE `communication_dialog` ADD CONSTRAINT `FK_97e7ddc794dcc8e2e3ead92a607` FOREIGN KEY (`last_answer_admin_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP FOREIGN KEY `FK_97e7ddc794dcc8e2e3ead92a607`");
        await queryRunner.query("ALTER TABLE `communication_dialog` DROP COLUMN `last_answer_admin_id`");
    }

}
