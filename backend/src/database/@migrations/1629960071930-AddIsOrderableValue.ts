import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsOrderableValue1629960071930 implements MigrationInterface {
    name = 'AddIsOrderableValue1629960071930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` ADD `is_orderable` tinyint NOT NULL DEFAULT 1");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `course` DROP COLUMN `is_orderable`");
    }
}
