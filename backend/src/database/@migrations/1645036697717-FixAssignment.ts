import {MigrationInterface, QueryRunner} from "typeorm";

export class FixAssignment1645036697717 implements MigrationInterface {
    name = 'FixAssignment1645036697717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `assignment` ADD `grade_a` int NULL");
        await queryRunner.query("ALTER TABLE `assignment` ADD `grade_b` int NULL");
        await queryRunner.query("ALTER TABLE `assignment` ADD `grade_c` int NOT NULL");
        await queryRunner.query("ALTER TABLE `assignment` ADD `is_manually` tinyint NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `assignment` ADD `max_points` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `assignment` DROP COLUMN `max_points`");
        await queryRunner.query("ALTER TABLE `assignment` DROP COLUMN `is_manually`");
        await queryRunner.query("ALTER TABLE `assignment` DROP COLUMN `grade_c`");
        await queryRunner.query("ALTER TABLE `assignment` DROP COLUMN `grade_b`");
        await queryRunner.query("ALTER TABLE `assignment` DROP COLUMN `grade_a`");
    }

}
