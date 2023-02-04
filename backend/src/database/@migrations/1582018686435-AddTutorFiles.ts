import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTutorFiles1582018686435 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE `tutor_folder` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `tutor_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('CREATE TABLE `tutor_file` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `mime_type` varchar(255) NOT NULL, `folder_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
    await queryRunner.query('ALTER TABLE `tutor_folder` ADD CONSTRAINT `FK_0971c3f18f02ed81bd197ea376b` FOREIGN KEY (`tutor_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `tutor_file` ADD CONSTRAINT `FK_0a6ee394d49398e0dde5f631a31` FOREIGN KEY (`folder_id`) REFERENCES `tutor_folder`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
  }

public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `tutor_file` DROP FOREIGN KEY `FK_0a6ee394d49398e0dde5f631a31`');
    await queryRunner.query('ALTER TABLE `tutor_folder` DROP FOREIGN KEY `FK_0971c3f18f02ed81bd197ea376b`');
    await queryRunner.query('DROP TABLE `tutor_file`');
    await queryRunner.query('DROP TABLE `tutor_folder`');
  }

}
