import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStudentTypeOfFaq1625220989260 implements MigrationInterface {
    name = 'AddStudentTypeOfFaq1625220989260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `faq` CHANGE `type` `type` enum ('general', 'course', 'student') NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `faq` CHANGE `type` `type` enum ('general', 'course') NOT NULL");
    }
}
