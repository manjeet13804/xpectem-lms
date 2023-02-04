import {MigrationInterface, QueryRunner} from "typeorm";

export class FixExam1638456142004 implements MigrationInterface {
    name = 'FixExam1638456142004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` CHANGE `max_tries` `max_tries` int NULL");
        await queryRunner.query("ALTER TABLE `exam` CHANGE `grade_a` `grade_a` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` CHANGE `grade_a` `grade_a` int NOT NULL");
        await queryRunner.query("ALTER TABLE `exam` CHANGE `max_tries` `max_tries` int NOT NULL");
    }

}
