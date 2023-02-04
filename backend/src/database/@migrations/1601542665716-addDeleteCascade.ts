import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeleteCascade1601542665716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `student_assignment_log` DROP FOREIGN KEY `FK_0f28071a4c459d44c28b797c9f3`");
        await queryRunner.query("ALTER TABLE `student_exam_log` DROP FOREIGN KEY `FK_088669e66bf34df37004315bbf5`");
        await queryRunner.query("ALTER TABLE `student_lesson_log` DROP FOREIGN KEY `FK_3fe20e099999628c68310eb3043`");
        await queryRunner.query("ALTER TABLE `student_lesson_log` ADD CONSTRAINT `FK_3fe20e099999628c68310eb3043` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_assignment_log` ADD CONSTRAINT `FK_0f28071a4c459d44c28b797c9f3` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_exam_log` ADD CONSTRAINT `FK_088669e66bf34df37004315bbf5` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `student_exam_log` DROP FOREIGN KEY `FK_088669e66bf34df37004315bbf5`");
        await queryRunner.query("ALTER TABLE `student_assignment_log` DROP FOREIGN KEY `FK_0f28071a4c459d44c28b797c9f3`");
        await queryRunner.query("ALTER TABLE `student_lesson_log` DROP FOREIGN KEY `FK_3fe20e099999628c68310eb3043`");
        await queryRunner.query("ALTER TABLE `student_lesson_log` ADD CONSTRAINT `FK_3fe20e099999628c68310eb3043` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_exam_log` ADD CONSTRAINT `FK_088669e66bf34df37004315bbf5` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_assignment_log` ADD CONSTRAINT `FK_0f28071a4c459d44c28b797c9f3` FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
