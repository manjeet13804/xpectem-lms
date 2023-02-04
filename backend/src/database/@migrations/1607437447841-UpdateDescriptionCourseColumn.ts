import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDescriptionCourseColumn1607437447841 implements MigrationInterface {
    name = 'UpdateDescriptionCourseColumn1607437447841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `topic` ADD `description` text NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `topic` ADD `description` varchar(255) NULL");
    }

}
