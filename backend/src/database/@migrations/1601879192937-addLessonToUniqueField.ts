import {MigrationInterface, QueryRunner} from "typeorm";

export class addLessonToUniqueField1601879192937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_c17a82e1eda54f8161f14820e1` ON `exam` (`topic_id`, `order`, `lesson_id`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_1340c65b63f4bd8befda1dcb14` ON `assignment` (`topic_id`, `order`, `lesson_id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_1340c65b63f4bd8befda1dcb14` ON `assignment`");
        await queryRunner.query("DROP INDEX `IDX_c17a82e1eda54f8161f14820e1` ON `exam`");
    }

}
