import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCertificationExamLog1621515094456 implements MigrationInterface {
    name = 'AddCertificationExamLog1621515094456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `certification_exam_log` (`id` int NOT NULL AUTO_INCREMENT, `date` datetime NOT NULL, `results` varchar(255) NOT NULL, `is_passed` tinyint NOT NULL, `course_student_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `certification_exam_log` ADD CONSTRAINT `FK_73f1087a749f46d8fb96d472b09` FOREIGN KEY (`course_student_id`) REFERENCES `course_student`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `certification_exam_log` DROP FOREIGN KEY `FK_73f1087a749f46d8fb96d472b09`");
        await queryRunner.query("DROP TABLE `certification_exam_log`");
    }

}
