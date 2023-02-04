import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTablesResults1573642244865 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE IF NOT EXISTS `exam_results` (' +
                                '`id` int NOT NULL AUTO_INCREMENT, ' +
                                '`result` int NULL, ' +
                                '`exam_id` int NOT NULL, ' +
                                '`user_id` int NOT NULL, ' +
                                'PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE IF NOT EXISTS `learn_attempts_logs` (' +
                                '`id` int NOT NULL AUTO_INCREMENT, ' +
                                '`token` varchar(255) NOT NULL, ' +
                                '`form_learn_id` int NOT NULL, ' +
                                '`type` varchar(255) NOT NULL, ' +
                                '`user_id` int NOT NULL, ' +
                                'PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE IF NOT EXISTS `course_progression` (' +
                                '`id` int NOT NULL AUTO_INCREMENT, ' +
                                '`progress` varchar(255) NULL, ' +
                                '`course_id` int NOT NULL, ' +
                                '`user_id` int NOT NULL, ' +
                                'PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE IF NOT EXISTS `assignment_results` (' +
                                '`id` int NOT NULL AUTO_INCREMENT, ' +
                                '`result` varchar(255) NULL, ' +
                                '`assignment_id` int NOT NULL, ' +
                                '`user_id` int NOT NULL, ' +
                                'PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `learn_attempts_logs` ADD CONSTRAINT `FK_ed4c04b31eebadba4385246311f` ' +
                                'FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `exam_results` ADD CONSTRAINT `FK_587fe839f813c89f1a4ce0610f0` ' +
                                'FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `exam_results` ADD CONSTRAINT `FK_295d66c4982926c06f4e35fb634` ' +
                                'FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_progression` ADD CONSTRAINT `FK_f4fde33503df9ee69ff19513b57` ' +
                                'FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `course_progression` ADD CONSTRAINT `FK_6e94a52b4240de9cad140fd8cfc` ' +
                                'FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `assignment_results` ADD CONSTRAINT `FK_551293c1b44d5e06eea6f8065c3` ' +
                                'FOREIGN KEY (`assignment_id`) REFERENCES `assignment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `assignment_results` ADD CONSTRAINT `FK_beddf34e8ac8c424c15dabb7c31` ' +
                                'FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `assignment_results` DROP FOREIGN KEY `FK_beddf34e8ac8c424c15dabb7c31`');
    await queryRunner.query('ALTER TABLE `assignment_results` DROP FOREIGN KEY `FK_551293c1b44d5e06eea6f8065c3`');
    await queryRunner.query('ALTER TABLE `course_progression` DROP FOREIGN KEY `FK_6e94a52b4240de9cad140fd8cfc`');
    await queryRunner.query('ALTER TABLE `course_progression` DROP FOREIGN KEY `FK_f4fde33503df9ee69ff19513b57`');
    await queryRunner.query('ALTER TABLE `exam_results` DROP FOREIGN KEY `FK_295d66c4982926c06f4e35fb634`');
    await queryRunner.query('ALTER TABLE `exam_results` DROP FOREIGN KEY `FK_587fe839f813c89f1a4ce0610f0`');
    await queryRunner.query('ALTER TABLE `learn_attempts_logs` DROP FOREIGN KEY `FK_ed4c04b31eebadba4385246311f`');
    await queryRunner.query('DROP TABLE `assignment_results`');
    await queryRunner.query('DROP TABLE `course_progression`');
    await queryRunner.query('DROP TABLE `exam_results`');
    await queryRunner.query('DROP TABLE `learn_attempts_logs`');
  }

}
