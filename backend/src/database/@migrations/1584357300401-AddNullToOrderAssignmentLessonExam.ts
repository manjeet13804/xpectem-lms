import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullToOrderAssignmentLessonExam1584357300401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `lesson` CHANGE `order` `order` int NULL');
        await queryRunner.query('ALTER TABLE `assignment` CHANGE `order` `order` int NULL');
        await queryRunner.query('ALTER TABLE `exam` CHANGE `order` `order` int NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `exam` CHANGE `order` `order` int NOT NULL');
        await queryRunner.query('ALTER TABLE `assignment` CHANGE `order` `order` int NOT NULL');
        await queryRunner.query('ALTER TABLE `lesson` CHANGE `order` `order` int NOT NULL');
    }

}
