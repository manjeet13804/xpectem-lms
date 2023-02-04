import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsActiveStatusOrganisations1605090714365 implements MigrationInterface {
    name = 'AddIsActiveStatusOrganisations1605090714365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `organisation` ADD `is_active` tinyint NOT NULL DEFAULT 1");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `organisation` DROP COLUMN `is_active`");
    }

}
