import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeGeneralTypeOfFaqToAdmin1625222154028 implements MigrationInterface {
    name = 'ChangeGeneralTypeOfFaqToAdmin1625222154028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `faq` CHANGE `type` `type` enum ('admin', 'course', 'student') NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `faq` CHANGE `type` `type` enum ('general', 'course', 'student') NOT NULL");
    }
}
