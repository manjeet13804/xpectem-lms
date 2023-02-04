import {MigrationInterface, QueryRunner} from "typeorm";

export class FixColumnName1610542568051 implements MigrationInterface {
    name = 'FixColumnName1610542568051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_message` CHANGE `is_cheked` `is_checked` tinyint NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `communication_message` CHANGE `is_checked` `is_cheked` tinyint NOT NULL DEFAULT '0'");
    }

}
